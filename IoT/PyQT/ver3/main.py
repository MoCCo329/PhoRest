import sys
from PyQt5.QtWidgets import *
from PyQt5 import QtCore
from PyQt5.QtCore import QTimer
from PyQt5.QtGui import QPixmap, QImage
import Main_Ui
import time
import threading
import cv2

stop_event = threading.Event()

class MainWindow(QMainWindow, Main_Ui.Ui_MainWindow):
    def __init__(self):
        QMainWindow.__init__(self)
        self.setupUi(self)

        self.initImgs()

        # Stacked Widget을 처음 화면으로 돌리기
        self.stack.setCurrentIndex(0)
        self.TopStack.setCurrentIndex(0)

        #마우스 클릭 이벤트 설정
        self.setMouseTracking(True)

        # 촬영버튼에 사용할 타이머기능 세팅
        self.timer = QTimer(self)
        self.timer.setInterval(1000)

        # 촬영화면에서 클릭 방지를 위해 flag변수 하나 채용
        self.Shot_Click_Flag = 0

        self.show()

    def initImgs(self):
        # 이전에 이미지 라벨별로 저장했던 것들 초기화 해줘야함
        self.Photo1.clear()
        self.Photo2.clear()
        self.Photo3.clear()
        self.Photo4.clear()

        self.Top_Big_Photo.clear()
        self.Label_Camera.clear()

    # 첫번째 화면에서는 어느 화면이던 클릭하면 두번째 화면으로 넘어간다
    def mousePressEvent(self, e):
        # 마우스 좌표 파악
        print("Mouse Point : x={0},y={1}".format(e.x(), e.y()))
        if(self.stack.currentIndex() == 0):
            self.stack.setCurrentIndex(1)
            self.Btn1.setCheckable(True)
            self.Btn2.setCheckable(True)
            self.Btn3.setCheckable(True)
            self.Btn4.setCheckable(True)
            self.Btn5.setCheckable(True)
            self.Btn6.setCheckable(True)
            self.Btn7.setCheckable(True)
            self.Btn8.setCheckable(True)
            self.Btn1.setAutoExclusive(True)
            self.Btn2.setAutoExclusive(True)
            self.Btn3.setAutoExclusive(True)
            self.Btn4.setAutoExclusive(True)
            self.Btn5.setAutoExclusive(True)
            self.Btn6.setAutoExclusive(True)
            self.Btn7.setAutoExclusive(True)
            self.Btn8.setAutoExclusive(True)

        # 이미지 클릭시 크게 띄워줄것임
        if (self.stack.currentIndex() == 3 and self.TopStack.currentIndex()==3 and self.Shot_Click_Flag):
            # 이미지1
            if(e.x()>=33 and e.x()<=347 and e.y()>=514 and e.y()<=717):
                self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo1.jpg')")
            elif(e.x()>=372 and e.x()<=684 and e.y()>=514 and e.y()<=717):
                self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo2.jpg')")
            elif (e.x() >= 34 and e.x() <= 347 and e.y() >= 742 and e.y() <= 945):
                self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo3.jpg')")
            elif (e.x() >= 372 and e.x() <= 684 and e.y() >= 742 and e.y() <= 945):
                self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo4.jpg')")


        # 마지막 인쇄 완료 페이지
        if(self.stack.currentIndex()==6):
            self.stack.setCurrentIndex(0)
            self.TopStack.setCurrentIndex(0)

    #---------------------- 2. 인원 선택 칸 -----------------------
    # 두번째 화면에서는 각 버튼마다 이벤트 존재
    def RecommandPose(self):
        self.TopStack.setCurrentIndex(1)

    def NextBottomButton_to_2(self):
        self.stack.setCurrentIndex(2)

    def Press_Btn1(self):
        _translate = QtCore.QCoreApplication.translate
        self.NowPeople.setText(_translate("MainWindow","<html><head/><body><p><span style=\" font-size:14pt; font-weight:600;\">1명</span></p></body></html>"))

    def Press_Btn2(self):
        _translate = QtCore.QCoreApplication.translate
        self.NowPeople.setText(_translate("MainWindow",
                                          "<html><head/><body><p><span style=\" font-size:14pt; font-weight:600;\">2명</span></p></body></html>"))

    def Press_Btn3(self):
        _translate = QtCore.QCoreApplication.translate
        self.NowPeople.setText(_translate("MainWindow",
                                          "<html><head/><body><p><span style=\" font-size:14pt; font-weight:600;\">3명</span></p></body></html>"))

    def Press_Btn4(self):
        _translate = QtCore.QCoreApplication.translate
        self.NowPeople.setText(_translate("MainWindow",
                                          "<html><head/><body><p><span style=\" font-size:14pt; font-weight:600;\">4명</span></p></body></html>"))

    def Press_Btn5(self):
        _translate = QtCore.QCoreApplication.translate
        self.NowPeople.setText(_translate("MainWindow",
                                          "<html><head/><body><p><span style=\" font-size:14pt; font-weight:600;\">5명</span></p></body></html>"))

    def Press_Btn6(self):
        _translate = QtCore.QCoreApplication.translate
        self.NowPeople.setText(_translate("MainWindow",
                                          "<html><head/><body><p><span style=\" font-size:14pt; font-weight:600;\">6명</span></p></body></html>"))

    def Press_Btn7(self):
        _translate = QtCore.QCoreApplication.translate
        self.NowPeople.setText(_translate("MainWindow",
                                          "<html><head/><body><p><span style=\" font-size:14pt; font-weight:600;\">7명</span></p></body></html>"))

    def Press_Btn8(self):
        _translate = QtCore.QCoreApplication.translate
        self.NowPeople.setText(_translate("MainWindow",
                                          "<html><head/><body><p><span style=\" font-size:14pt; font-weight:600;\">8명</span></p></body></html>"))


    # -------------------------- 3번째 촬영버튼 페이지 ------------------------------
    # 15초간의 타이머 작동
    def Press_PreparedBtn(self):
        global CurrentPhotoCnt, RunCamera_thread
        self.CurrentPhotoCnt=0

        #먼저 촬영페이지의 넥스트 버튼 클릭 방지를 위해 Disable 처리
        self.NextBtn_3.setDisabled(True)
        self.NextBtn_3.hide()

        self.stack.setCurrentIndex(3)
        self.TopStack.setCurrentIndex(2)

        # 카메라에서 시간초마다 사진을 찍게 하려면 별도 스레드에서 구현
        self.ShotPhoto_thread = threading.Thread(target=self.ShotPhoto)
        self.ShotPhoto_thread.start()

    def Run_Camera(self):
        global CurrentPhotoCnt, cap
        cap = cv2.VideoCapture(-1)
        width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
        height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
        self.Label_Camera.resize(width, height)

        while self.CurrentPhotoCnt < 4:
            ret, img = cap.read()
            if ret:
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                img = cv2.flip(img, 1)
                h, w, c = img.shape
                qImg = QImage(img.data, w, h, w * c, QImage.Format_RGB888)
                Videopixmap = QPixmap.fromImage(qImg)
                self.Label_Camera.setPixmap(Videopixmap)
            else:
                print("cannot read camera")
                break
        cap.release()

    #----------------------------4번째 촬영 페이지---------------------------------
    def ShotPhoto(self):
        # 타이머 작동
        self.StartTime = 15
        for num in range(1,5):
            for i in range(15,0,-1):
                self.Label_Timer.setText(str(i))
                time.sleep(1)
            self.Label_Timer.setText("0")

            # 사진을 찍는 신호 보냄
            # 그러면 다른 스레드에서 신호가 오면 사진을 찍고 flag 다시 원래대로 돌려놓음
            # 사진을 찍을 때 애니메이션 기능을 넣어서 사용자가 사진이 찍힌건지 확인 가능해야한다.
            # 이때 파일경로 마지막 파일명은 "photo{}".format(self.CurrentPhotoCnt+1)"
            # self.CurrentPhotoCnt 가 3이면 찍고, 0으로 돌려놓음
            # 사진이 저장되는 시간을 확보하기 위해서 3초간의 sleep을 둠
            time.sleep(3)

            pixmap = QPixmap("./photoDir/photo{}".format(num))
            pixmap = pixmap.scaledToHeight(200)
            if(num==1):
                self.Photo1.setPixmap(pixmap)
            elif(num==2):
                self.Photo2.setPixmap(pixmap)
            elif(num==3):
                self.Photo3.setPixmap(pixmap)
            elif(num==4):
                self.Photo4.setPixmap(pixmap)

        #다 찍었으면 TopPage 다음페이지로, 넥스트 버튼 나타나게
        self.Shot_Click_Flag = 1
        self.NextBtn_3.setEnabled(True)
        self.NextBtn_3.setVisible(True)
        self.TopStack.setCurrentIndex(3)

        self.Show_Big_Image()

    def kimchi(self,num):
        global cap
        ret, img = cap.read()
        cv2.imwrite('./photoDir/photo{}.jpg'.format(num), img)

    def NextBottomButton_to_4(self):
        self.stack.setCurrentIndex(4)
        self.TopStack.setCurrentIndex(4)

    def Show_Big_Image(self):
        pass


    def Press_Back(self):
        self.stack.setCurrentIndex(self.stack.currentIndex()-1)


    # -------------------------- 5번째 프레임 선택 페이지 ------------------------------

    # 프레임까지 적용하여 화면에 띄워주는 버튼
    def Press_Applying(self):
        print("Apply")

    # 프린트 버튼
    def Press_Printing(self):
        print("print")
        self.stack.setCurrentIndex(5)

        # -------------------------- 6번째 인쇄중 출력 페이지 ------------------------------
        # 이곳에는 프린트가 출력이 완료되는 신호를 받는다면 다음 장면으로 넘겨준다
        print("Now Printing")

        # 임시로 3초후 넘어가게 일단은 구현
        time.sleep(3)
        self.stack.setCurrentIndex(6)

        # -------------------------- 7번째 인쇄 완료 페이지 --------------------------------
        self.initImgs()








if __name__ == '__main__':
    app = QApplication(sys.argv)
    win = MainWindow()
    try:
        sys.exit(app.exec_())
    except:
        print("Exiting")