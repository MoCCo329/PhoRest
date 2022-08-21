from PyQt5.QtWidgets import *
from PyQt5 import QtCore
from PyQt5.QtCore import QTimer
from PyQt5.QtGui import QPixmap, QImage
import Main_Ui
import time, threading, cv2, os, qrcode, sys, base64
from PIL import Image, ImageDraw, ImageFont
import datetime as dt
import requests, urllib.request, json
from moviepy.editor import *

stop_event = threading.Event()


class MainWindow(QMainWindow, Main_Ui.Ui_MainWindow):
    def __init__(self):
        QMainWindow.__init__(self)
        self.setupUi(self)

        self.initImgs()

        # self.offset (몇번째 포즈를 받아올 것인지)
        self.offset_1 = 0
        self.offset_2 = 0
        self.offset_3 = 0
        self.offset_4 = 0
        self.offset_5 = 0
        self.offset_6 = 0
        self.ChooseBtnNum = 0

        # Stacked Widget을 처음 화면으로 돌리기
        self.stack.setCurrentIndex(0)
        self.TopStack.setCurrentIndex(0)

        # 마우스 클릭 이벤트 설정
        self.setMouseTracking(True)

        # 촬영버튼에 사용할 타이머기능 세팅
        self.timer = QTimer(self)
        self.timer.setInterval(1000)

        # 촬영화면에서 클릭 방지를 위해 flag변수 하나 채용
        self.Shot_Click_Flag = 0
        # 프린팅이 완료됐는지를 판별하는 Flag
        self.Final_Flag = 0

        # frame color id 초기화
        self.Frame_Color_Id = "#FFFFFF"

        # 포토 카운터 초기화
        self.CurrentPhotoCnt = 0

        # 레코딩 플레그
        self.startRecording = False

        self.ShotPhoto_thread = threading.Thread(target=self.ShotPhoto)
        self.ShotPhoto_thread.setDaemon(True)
        self.RunCamera_thread = threading.Thread(target=self.Run_Camera)
        self.RunCamera_thread.setDaemon(True)
        self.lock = threading.Lock()

        # 카메라에서 시간초마다 사진을 찍게 하려면 별도 스레드에서 구현
        self.ShotPhoto_thread.start()
        self.RunCamera_thread.start()
        # stop_event.clear()

        self.Warning_label.hide()

        self.ChoosePersonNumBtns = [self.Btn1, self.Btn2, self.Btn3, self.Btn4, self.Btn5, self.Btn6]

        self.show()

    def initImgs(self):
        self.offset_1 = 0
        self.offset_2 = 0
        self.offset_3 = 0
        self.offset_4 = 0
        self.offset_5 = 0
        self.offset_6 = 0
        self.ChooseBtnNum = 0

        # 이전에 이미지 라벨별로 저장했던 것들 초기화 해줘야함
        self.Photo1.clear()
        self.Photo2.clear()
        self.Photo3.clear()
        self.Photo4.clear()

        self.Photo1.setText("1")
        self.Photo2.setText("2")
        self.Photo3.setText("3")
        self.Photo4.setText("4")

        self.Pose_img.clear()

        self.Top_Big_Photo.clear()
        self.Label_Camera.clear()
        self.PhotoPlusFrame.clear()

    # 첫번째 화면에서는 어느 화면이던 클릭하면 두번째 화면으로 넘어간다
    def mousePressEvent(self, e):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')

        # 마우스 좌표 파악
        # print("Mouse Point : x={0},y={1}".format(e.x(), e.y()))
        if (self.stack.currentIndex() == 0):
            self.stack.setCurrentIndex(1)
            self.Btn1.setCheckable(True)
            self.Btn2.setCheckable(True)
            self.Btn3.setCheckable(True)
            self.Btn4.setCheckable(True)
            self.Btn5.setCheckable(True)
            self.Btn6.setCheckable(True)
            self.Btn1.setAutoExclusive(True)
            self.Btn2.setAutoExclusive(True)
            self.Btn3.setAutoExclusive(True)
            self.Btn4.setAutoExclusive(True)
            self.Btn5.setAutoExclusive(True)
            self.Btn6.setAutoExclusive(True)
            self.ChooseBtnNum = 0
        # 이미지 클릭시 크게 띄워줄것임
        if (self.stack.currentIndex() == 3 and self.TopStack.currentIndex() == 3 and self.Shot_Click_Flag):
            # 이미지1
            if (e.x() >= 67 and e.x() <= 544 and e.y() >= 752 and e.y() <= 1062):
                self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo1.jpg')")
            elif (e.x() >= 615 and e.x() <= 1091 and e.y() >= 752 and e.y() <= 1062):
                self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo2.jpg')")
            elif (e.x() >= 67 and e.x() <= 544 and e.y() >= 1112 and e.y() <= 1422):
                self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo3.jpg')")
            elif (e.x() >= 615 and e.x() <= 1091 and e.y() >= 1112 and e.y() <= 1422):
                self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo4.jpg')")

        # 마지막 인쇄 완료 페이지
        if (self.stack.currentIndex() == 6 and self.Final_Flag):
            self.Final_Flag = 0
            self.stack.setCurrentIndex(0)
            self.TopStack.setCurrentIndex(0)

    # ---------------------- 2. 인원 선택 칸 -----------------------
    # 두번째 화면에서는 각 버튼마다 이벤트 존재
    def RecommandPose(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')

        self.recommand_pose_flag = 1

        # 이미지 받아와서 띄워놓는 코드 작성
        # 이미지를 배열 형태 (json 형식) 으로 받아온다.

        limit = 1

        if self.ChooseBtnNum == 1:
            offset = self.offset_1
        elif self.ChooseBtnNum == 2:
            offset = self.offset_2
        elif self.ChooseBtnNum == 3:
            offset = self.offset_3
        elif self.ChooseBtnNum == 4:
            offset = self.offset_4
        elif self.ChooseBtnNum == 5:
            offset = self.offset_5
        elif self.ChooseBtnNum == 6:
            offset = self.offset_6

        data = {
            'limit': limit,
            'offset': offset,
            'humanCount': self.ChooseBtnNum
        }

        headers = {'Content-type': 'application/json; charset=utf-8'}
        cookies = {'ck_test': 'cookies_test'}

        res = requests.post("https://i7a101.p.ssafy.io/api/community/photogroup/like", json=data, headers=headers,
                            cookies=cookies)
        print(res)
        print(type(res))
        print(res.text)

        js = json.loads(res.text)
        print(js)
        url = js[0].get("url")
        print(url)

        # json으로 받아오면 이를 띄워줘야한다.
        # Web에서 Image 정보 로드
        poseimg = urllib.request.urlopen(url).read()
        pixmap = QPixmap()
        pixmap.loadFromData(poseimg)
        pixmap = pixmap.scaledToHeight(600)
        self.Pose_img.setPixmap(pixmap)

        print("성공")

    # 좌우 버튼 누를때마다 백엔드에 계속 신호 보내줘야 한다.
    def Press_RightBtn(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')

        if self.ChooseBtnNum == 1:
            self.offset_1 += 1
            if self.offset_1 >= 5:
                self.offset_1 = 0
        elif self.ChooseBtnNum == 2:
            self.offset_2 += 1
            if self.offset_2 >= 5:
                self.offset_2 = 0
        elif self.ChooseBtnNum == 3:
            self.offset_3 += 1
            if self.offset_3 >= 5:
                self.offset_3 = 0
        elif self.ChooseBtnNum == 4:
            self.offset_4 += 1
            if self.offset_4 >= 5:
                self.offset_4 = 0
        elif self.ChooseBtnNum == 5:
            self.offset_5 += 1
            if self.offset_5 >= 5:
                self.offset_5 = 0
        elif self.ChooseBtnNum == 6:
            self.offset_6 += 1
            if self.offset_6 >= 5:
                self.offset_6 = 0

        self.RecommandPose()

    def Press_LeftBtn(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')

        if self.ChooseBtnNum == 1:
            self.offset_1 -= 1
            if self.offset_1 < 0:
                self.offset_1 = 4
        elif self.ChooseBtnNum == 2:
            self.offset_2 -= 1
            if self.offset_2 < 0:
                self.offset_2 = 4
        elif self.ChooseBtnNum == 3:
            self.offset_3 -= 1
            if self.offset_3 < 0:
                self.offset_3 = 4
        elif self.ChooseBtnNum == 4:
            self.offset_4 -= 1
            if self.offset_4 < 0:
                self.offset_4 = 4
        elif self.ChooseBtnNum == 5:
            self.offset_5 -= 1
            if self.offset_5 < 0:
                self.offset_5 = 4
        elif self.ChooseBtnNum == 6:
            self.offset_6 -= 1
            if self.offset_6 < 0:
                self.offset_6 = 4

        self.RecommandPose()

    def NextBottomButton_to_2(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')

        if (self.ChooseBtnNum != 0):
            self.stack.setCurrentIndex(2)

    def changeBtnColor(self, BtnNum):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')

        for Btn in self.ChoosePersonNumBtns:
            Btn.setStyleSheet("QPushButton{"
                            "color: #000000;"
                            "background-color: #F8F8F8;"
                            "padding: 12px;"
                            "border-bottom: 4px solid #c8c8c8;"
                            "border-radius: 50%;"
                            "}")
        
        self.ChoosePersonNumBtns[BtnNum-1].setStyleSheet("QPushButton{"
                                "color: #000000;"
                                "background-color: #FFE650;"
                                "padding: 12px;"
                                "border-bottom: 4px solid #FFC81E;"
                                "border-radius: 50%;"
                                "}")

    def Press_Btn1(self):

        self.ChooseBtnNum = 1
        self.changeBtnColor(self.ChooseBtnNum)

        # 선택 후 첫번째 장 받아오고 다음 버튼 누를때마다 사진을 받아와?
        self.RecommandPose()
        print("끝")
        self.TopStack.setCurrentIndex(1)

    def Press_Btn2(self):
      
        self.ChooseBtnNum = 2
        self.changeBtnColor(self.ChooseBtnNum)

        # 선택 후 첫번째 장 받아오고 다음 버튼 누를때마다 사진을 받아와?
        self.RecommandPose()
        self.TopStack.setCurrentIndex(1)

    def Press_Btn3(self):
      
        self.ChooseBtnNum = 3
        self.changeBtnColor(self.ChooseBtnNum)

        # 선택 후 첫번째 장 받아오고 다음 버튼 누를때마다 사진을 받아와?
        self.RecommandPose()
        self.TopStack.setCurrentIndex(1)

    def Press_Btn4(self):

        self.ChooseBtnNum = 4
        self.changeBtnColor(self.ChooseBtnNum)

        # 선택 후 첫번째 장 받아오고 다음 버튼 누를때마다 사진을 받아와?
        self.RecommandPose()
        self.TopStack.setCurrentIndex(1)

    def Press_Btn5(self):

        self.ChooseBtnNum = 5
        self.changeBtnColor(self.ChooseBtnNum)

        # 선택 후 첫번째 장 받아오고 다음 버튼 누를때마다 사진을 받아와?
        self.RecommandPose()
        self.TopStack.setCurrentIndex(1)

    def Press_Btn6(self):

        self.ChooseBtnNum = 6
        self.changeBtnColor(self.ChooseBtnNum)

        # 선택 후 첫번째 장 받아오고 다음 버튼 누를때마다 사진을 받아와?
        self.RecommandPose()
        self.TopStack.setCurrentIndex(1)

    # -------------------------- 3번째 촬영버튼 페이지 ------------------------------
    # 15초간의 타이머 작동
    def Press_PreparedBtn(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')

        self.CurrentPhotoCnt = 0

        # 먼저 촬영페이지의 넥스트 버튼 클릭 방지를 위해 Disable 처리
        self.NextBtn_3.setDisabled(True)
        self.NextBtn_3.hide()
        self.PhotoPage_Label.hide()

        self.stack.setCurrentIndex(3)
        self.TopStack.setCurrentIndex(2)

        stop_event.set()

    def Run_Camera(self):
        self.Label_Camera.resize(900, 600)
        while True:
            stop_event.wait()
            self.cap = cv2.VideoCapture(0)

            fps = self.cap.get(cv2.CAP_PROP_FPS)

            if fps == 0.0:
                fps = 30.0

            time_per_frame_video = 1 / fps
            last_time = time.perf_counter()

            # width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            # height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            writer = cv2.VideoWriter('./video/video_{}.mp4'.format(self.CurrentPhotoCnt + 1), fourcc, fps, (360, 255))

            while stop_event.is_set():
                # stop_event.wait()
                ret, img = self.cap.read()
                if ret:
                    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                    img = cv2.flip(img, 1)
                    resize_img = cv2.resize(img, (900, 600), interpolation=cv2.INTER_CUBIC)
                    h, w, c = resize_img.shape
                    qImg = QImage(resize_img.data, w, h, w * c, QImage.Format_RGB888)
                    Videopixmap = QPixmap.fromImage(qImg)
                    self.Label_Camera.setPixmap(Videopixmap)

                    if self.startRecording:
                        video_img = cv2.resize(img, (360, 255), interpolation=cv2.INTER_CUBIC)
                        video_img = cv2.cvtColor(video_img, cv2.COLOR_BGR2RGB)
                        writer.write(video_img)

                        # fsp 계산
                        time_per_frame = time.perf_counter() - last_time
                        time_sleep_frame = max(0, time_per_frame_video - time_per_frame)
                        time.sleep(time_sleep_frame)

                        last_time = time.perf_counter()
                else:
                    print("cannot read camera")
                    break
            self.cap.release()
            writer.release()

    # ----------------------------4번째 촬영 페이지---------------------------------
    def ShotPhoto(self):
        while True:
            stop_event.wait()
            # 타이머 작동
            self.StartTime = 8
            for num in range(1, 5):
                for i in range(self.StartTime, 0, -1):
                    self.Label_Timer.setText(str(i))
                    if i == 5:
                        self.startRecording = True
                    time.sleep(1)
                self.Label_Timer.setText("0")
                self.startRecording = False
                self.kimchi(num)
                self.CurrentPhotoCnt += 1

                pixmap = QPixmap("./photoDir/photo{}".format(num))
                pixmap = pixmap.scaledToHeight(250)
                if (num == 1):
                    self.Photo1.setPixmap(pixmap)
                elif (num == 2):
                    self.Photo2.setPixmap(pixmap)
                elif (num == 3):
                    self.Photo3.setPixmap(pixmap)
                elif (num == 4):
                    self.Photo4.setPixmap(pixmap)

                stop_event.set()

            # 다 찍었으면 TopPage 다음페이지로, 넥스트 버튼 나타나게
            self.Shot_Click_Flag = 1
            self.PhotoPage_Label.setVisible(True)
            self.NextBtn_3.setEnabled(True)
            self.NextBtn_3.setVisible(True)
            self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo1.jpg')")
            self.TopStack.setCurrentIndex(3)

            stop_event.clear()
            self.make_image()
            time.sleep(1)

    def make_image(self):
        img1 = Image.open("./photoDir/photo1.jpg")
        img2 = Image.open("./photoDir/photo2.jpg")
        img3 = Image.open("./photoDir/photo3.jpg")
        img4 = Image.open("./photoDir/photo4.jpg")

        img_size = (600, 425)

        img1 = img1.resize(img_size)
        img2 = img2.resize(img_size)
        img3 = img3.resize(img_size)
        img4 = img4.resize(img_size)

        new_img = Image.new("RGBA", (1500, 1000), (0, 0, 0, 0))
        new_img.paste(img1, (50, 50))
        new_img.paste(img2, (img_size[0] + 100, 50))
        new_img.paste(img3, (50, img_size[1] + 100))
        new_img.paste(img4, (img_size[0] + 100, img_size[1] + 100))

        new_img.save("./photoDir/merged_img.png", "PNG")

    def kimchi(self, num):
        self.lock.acquire()
        self.TopStack.setStyleSheet("background-color : #FFFFFF")
        ret, img = self.cap.read()
        img = cv2.flip(img, 1)
        cv2.imwrite('./photoDir/photo{}.jpg'.format(num), img)

        stop_event.clear()
        # 찰칵 소리 출력
        os.system('aplay ./camera_sound.wav')

        time.sleep(0.5)
        self.TopStack.setStyleSheet("background-color : #FFF7E7")
        time.sleep(0.5)
        self.stack.setStyleSheet("background-color : #FFF7E7")
        time.sleep(0.5)
        print("Kimchi")
        self.lock.release()
        time.sleep(1)

    def NextBottomButton_to_4(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')

        self.Warning_label.hide()
        self.stack.setCurrentIndex(4)
        self.TopStack.setCurrentIndex(4)

    def Press_Back(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')

        self.stack.setCurrentIndex(self.stack.currentIndex() - 1)

    # -------------------------- 5번째 프레임 선택 페이지 ------------------------------

    # 프레임까지 적용하여 화면에 띄워주는 버튼
    def Press_Applying(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')

        # 먼저 입력한 Frame_id를 서버에 보냄
        self.frame_id = self.Frame_Id.text()
        if(self.frame_id == ""):
            print("빈칸")
        else:
            data = {
                'frameId': self.frame_id
            }

            # 서버에 post 요청
            res = requests.post("https://i7a101.p.ssafy.io/api/download/frame", data=data)
            print(res)
            # 리턴으로 res에 이미지 url을 담아서 보내줌
            # print(res.text)

            # 다운받을 이미지 url (res에서 받아오는 이미지 주소)
            url = res.text
            print(url)
            if(url == "fail"):
                print("잘못된 코드 입니다.")
                self.Warning_label.setVisible(True)

            else:
                self.Warning_label.hide()
                os.system("curl " + url + " > ./Frame/Frame_9.png")
                time.sleep(0.5)

                # 프레임이미지 리사이즈
                frame_img = Image.open('./Frame/Frame_9.png')
                frame_img = frame_img.resize((1500, 1000))
                frame_img.save('./Frame/Frame_9.png')

                self.FrameNum = 9

                self.make_Frame_Img(self.FrameNum)
            self.Frame_Id.clear()

    def Erase_LineEdit(self):
        self.Frame_Id.clear()

    def make_Frame_Img(self, num):
        FrameImgColor = cv2.imread('./Frame/Frame_{}.png'.format(num))
        b = int(FrameImgColor[10][1490][0])
        g = int(FrameImgColor[10][1490][1])
        r = int(FrameImgColor[10][1490][2])
        sumColor = 255
        newColor = (sumColor - r, sumColor - g, sumColor - b)

        # watermark
        waterFont = ImageFont.truetype('./703.ttf', 60)
        mark_width, mark_height = waterFont.getsize('PhoRest')
        watermark = Image.new('RGBA', (mark_width, mark_height), (0, 0, 0, 0))
        waterdraw = ImageDraw.Draw(watermark)
        waterdraw.text((0, 0), 'PhoRest', fill=newColor, font=waterFont, align='center')
        watermark = watermark.rotate(90, expand=1)

        # datestr
        time = dt.datetime.now()
        datestr = time.strftime('%Y/%m/%d')
        dateFont = ImageFont.truetype('./703.ttf', 30)
        date_width, date_height = dateFont.getsize(datestr)
        datemark = Image.new('RGBA', (date_width, date_height), (0, 0, 0, 0))
        datedraw = ImageDraw.Draw(datemark)
        datedraw.text((0, 0), datestr, fill=newColor, font=dateFont, align='center')
        datemark = datemark.rotate(90, expand=1)

        self.FrameImg = Image.open('./Frame/Frame_{}.png'.format(num))
        img = Image.open('./photoDir/merged_img.png')
        img_size = (600, 425)
        self.FrameImg.paste(img, (0, 0), img)

        self.FrameImg.paste(watermark, ((img_size[0] * 2) + 100 + 20, 50), watermark)
        self.FrameImg.paste(datemark, ((img_size[0] * 2) + 100 + 20 + mark_height + 10, 50), datemark)

        ShowImg = self.FrameImg.resize((900, 600))
        ShowImg.save('./ShowImg.png', 'PNG')
        pixmap = QPixmap('./ShowImg.png')
        self.PhotoPlusFrame.setPixmap(pixmap)

    # 프레임 컬러 선택 버튼
    def Press_BasicFrame1(self):
        self.FrameNum = 1
        self.make_Frame_Img(self.FrameNum)
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')

    def Press_BasicFrame2(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')
        self.FrameNum = 2
        self.make_Frame_Img(self.FrameNum)

    def Press_BasicFrame3(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')
        self.FrameNum = 3
        self.make_Frame_Img(self.FrameNum)

    def Press_BasicFrame4(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')
        self.FrameNum = 4
        self.make_Frame_Img(self.FrameNum)

    def Press_BasicFrame5(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')
        self.FrameNum = 5
        self.make_Frame_Img(self.FrameNum)

    def Press_BasicFrame6(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')
        self.FrameNum = 6
        self.make_Frame_Img(self.FrameNum)

    def Press_BasicFrame7(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')
        self.FrameNum = 7
        self.make_Frame_Img(self.FrameNum)

    def Press_BasicFrame8(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')
        self.FrameNum = 8
        self.make_Frame_Img(self.FrameNum)

    def make_VideoFile(self):
        back = cv2.imread('./Frame/Frame_{}.png'.format(self.FrameNum))
        back = cv2.resize(back, (900, 600))

        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        writer = cv2.VideoWriter('./video/back.mp4', fourcc, 1, (900, 600))

        for i in range(4):
            writer.write(back)

        writer.release()
        print(2)
        background = VideoFileClip('./video/back.mp4')
        clip1 = VideoFileClip('./video/video_1.mp4')
        clip2 = VideoFileClip('./video/video_2.mp4')
        clip3 = VideoFileClip('./video/video_3.mp4')
        clip4 = VideoFileClip('./video/video_4.mp4')

        video_size = (360, 255)
        print(3)
        mergedVideo = CompositeVideoClip([
            background,
            clip1.set_position((30, 30)),
            clip2.set_position((video_size[0] + 60, 30)),
            clip3.set_position((30, video_size[1] + 60)),
            clip4.set_position((video_size[0] + 60, video_size[1] + 60))
        ])

        mergedVideo.write_videofile('./video/mergedVideo.mp4')
        print(4)

    # 프린트 버튼
    # 프린트 누르고
    # 1번째로는 사진 보내고
    # url / upload / video
    # 2번째 보낼 때 post로 data를 postid까지 보낸다
    def Press_Printing(self):
        # 터치 효과음 추가
        os.system('aplay ./touch_sound.wav')

        self.FrameImg.save('./FramePlusImg.png', 'PNG')
        self.stack.setCurrentIndex(6)

        # -------------------------- 6번째 인쇄중 출력 페이지 ------------------------------
        # 인쇄가 끝나면 업로드 코드 넣기 (사진 먼저)
        img = open('./FramePlusImg.png', 'rb')
        files = {
            'image': img
        }

        data = {
            'humanCount': self.ChooseBtnNum
        }
        print(self.ChooseBtnNum)
        res = requests.post("https://i7a101.p.ssafy.io/api/upload/photogroup", files=files, data=data)

        post_id = res.text

        #base64 암호화
        int_post_id = (int(post_id) * 73) - 37
        str_post_id = str(int_post_id)
        post_id_byte = str_post_id.encode('ascii')
        post_id_base64 = base64.b64encode(post_id_byte)
        post_id_base64_str = post_id_base64.decode('ascii')

        # QR코드 작성
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=1,
            border=1
        )

        url = 'https://i7a101.p.ssafy.io/download/' + post_id_base64_str
        qr.add_data(url)
        qr.make()
        qrimg = qr.make_image(fill_color='black', back_color='white')
        qrimg.save('./photoDir/QRCodeImg.jpg')

        QRcode = Image.open("./photoDir/QRCodeImg.jpg")
        QRcode = qrimg.resize((130, 130))

        # QR을 적용시킨 프레임 만들기
        img_size = (600, 425)
        printImg = Image.open('./FramePlusImg.png')
        printImg.paste(QRcode, ((img_size[0] * 2) + 100 + 10, 1000 - 50 - 130))
        printImg.save('./FramePlusImg.png', 'PNG')

        # 인쇄 하는 코드 넣기
        # os.system('lp -d epson -n {} ./FramePlusImg.png'.format(self.ChooseBtnNum))

        # 동영상 만들기
        self.make_VideoFile()

        # 동영상 업로드 코드
        Vid = open('./video/mergedVideo.mp4', 'rb')
        files_video = {
            'video': Vid
        }

        data_video = {
            'postId': post_id
        }

        res_video = requests.post("https://i7a101.p.ssafy.io/api/upload/video", files=files_video, data=data_video)
        print(res_video)

        self.Final_Flag = 1
        self.initImgs()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    win = MainWindow()
    try:
        sys.exit(app.exec_())
    except:
        print("Exiting")
