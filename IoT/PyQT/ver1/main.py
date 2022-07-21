import sys
from PyQt5.QtWidgets import *
from PyQt5 import QtCore
from PyQt5.QtCore import QTimer
from PyQt5.QtGui import QPixmap, QMovie
import Main_Ui
import time
import threading
class MainWindow(QMainWindow, Main_Ui.Ui_MainWindow):
    def __init__(self):
        QMainWindow.__init__(self)
        self.setupUi(self)

        # Stacked Widget을 처음 화면으로 돌리기
        self.stack.setCurrentIndex(0)
        self.TopStack.setCurrentIndex(0)

        #마우스 클릭 이벤트 설정
        self.setMouseTracking(True)

        # 촬영버튼에 사용할 타이머기능 세팅
        self.timer = QTimer(self)
        self.timer.setInterval(1000)

        self.show()

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
        if (self.stack.currentIndex() == 4):
            # 이미지1
            if(e.x()>=33 and e.x()<=347 and e.y()>=514 and e.y()<=717):
                self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo1.jpg')")
            elif(e.x()>=372 and e.x()<=684 and e.y()>=514 and e.y()<=717):
                self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo2.jpg')")
            elif (e.x() >= 34 and e.x() <= 347 and e.y() >= 742 and e.y() <= 945):
                self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo3.jpg')")
            elif (e.x() >= 372 and e.x() <= 684 and e.y() >= 742 and e.y() <= 945):
                self.Top_Big_Photo.setStyleSheet("border-image:url('./photoDir/photo4.jpg')")

    #---------------------- 2. 인원 선택 칸 -----------------------
    # 두번째 화면에서는 각 버튼마다 이벤트 존재
    def RecommandPose(self):
        self.TopStack.setCurrentIndex(1)

    def NextButton(self):
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


    # -------------------------- 3번째 촬영준비버튼 페이지 ------------------------------
    # 5초간의 타이머 작동
    def Press_PreparedBtn(self):
        self.CurrentPhotoCnt=0
        self.stack.setCurrentIndex(3)

        self.ShowCamera_thread = threading.Thread(target=self.ShowCamera)
        self.ShowCamera_thread.start()

        self.TopStack.setCurrentIndex(2)

        self.Timer_thread = threading.Thread(target=self.FiveSecTimer)

    def ShowCamera(self):
        # 해당부분도 잘 작동이 또안되네;
        # 탑부분에 카메라 연결해서 보여줘야함
        # 일단 gif 잘뜨는지 Test
        self.movie = QMovie('./Test.gif')
        self.Label_Camera.setMovie(self.movie)
        self.movie.start()

    def Press_ShotBtn(self):
        # 스레드 충돌이 자꾸 발생해서 해당 부분 해결해야함;
        self.Timer_thread.start()
        print("ㅎㅇ")
        self.Timer_thread.join()

    def Press_Back(self):
        self.stack.setCurrentIndex(self.stack.currentIndex()-1)

    def FiveSecTimer(self):
        print("gd")
        self.RemainTime = 5
        for i in range(6):
            self.Label_Timer.setText(str(self.RemainTime))
            self.RemainTime -= 1;
            self.timer.start()
            time.sleep(1)
            if(self.RemainTime == -1):
                # 사진찍고 ./photoDir/photo1~4 로 저장
                print("사진 찍기")


        #혹시 사진 저장이 느릴수도 있으니까 1초정도 지연 줬음 (추후 수정)
        #time.sleep(0.5)

        #저장된 이미지를 저장해서 다음 스택에 미리 띄워놓음
        #self.Photo1.setStyleSheet("border-image:url('./photoDir/photo1.jpg')")
        #self.Photo2.setStyleSheet("border-image:url('./photoDir/photo2.jpg')")
        #self.Photo3.setStyleSheet("border-image:url('./photoDir/photo3.jpg')")
        #self.Photo4.setStyleSheet("border-image:url('./photoDir/photo4.jpg')")

        #self.stack.setCurrentIndex(4)
        #self.TopStack.setCurrentIndex(3)

    # -------------------------- 4번째 사진 찍은 결과를 볼 수 있는 페이지 ------------------------------



if __name__ == '__main__':
    app = QApplication(sys.argv)
    win = MainWindow()
    try:
        sys.exit(app.exec_())
    except:
        print("Exiting")