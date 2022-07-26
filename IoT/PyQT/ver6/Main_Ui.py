# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'Main_Ui.ui'
#
# Created by: PyQt5 UI code generator 5.15.7
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(1294, 1384)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.stack = QtWidgets.QStackedWidget(self.centralwidget)
        self.stack.setGeometry(QtCore.QRect(0, 660, 1280, 720))
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Fixed, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.stack.sizePolicy().hasHeightForWidth())
        self.stack.setSizePolicy(sizePolicy)
        self.stack.setStyleSheet("background-color : #FFF7E7")
        self.stack.setObjectName("stack")
        self.InitPage = QtWidgets.QWidget()
        self.InitPage.setObjectName("InitPage")
        self.label = QtWidgets.QLabel(self.InitPage)
        self.label.setGeometry(QtCore.QRect(4, 330, 1271, 60))
        self.label.setLayoutDirection(QtCore.Qt.LeftToRight)
        self.label.setStyleSheet("color : #C25642")
        self.label.setAlignment(QtCore.Qt.AlignCenter)
        self.label.setObjectName("label")
        self.stack.addWidget(self.InitPage)
        self.ChoosePeoplePage = QtWidgets.QWidget()
        self.ChoosePeoplePage.setObjectName("ChoosePeoplePage")
        self.label_3 = QtWidgets.QLabel(self.ChoosePeoplePage)
        self.label_3.setGeometry(QtCore.QRect(40, 60, 471, 71))
        self.label_3.setObjectName("label_3")
        self.line_2 = QtWidgets.QFrame(self.ChoosePeoplePage)
        self.line_2.setGeometry(QtCore.QRect(0, 160, 1281, 20))
        self.line_2.setFrameShape(QtWidgets.QFrame.HLine)
        self.line_2.setFrameShadow(QtWidgets.QFrame.Sunken)
        self.line_2.setObjectName("line_2")
        self.label_4 = QtWidgets.QLabel(self.ChoosePeoplePage)
        self.label_4.setGeometry(QtCore.QRect(570, 80, 181, 41))
        self.label_4.setObjectName("label_4")
        self.NowPeople = QtWidgets.QLabel(self.ChoosePeoplePage)
        self.NowPeople.setGeometry(QtCore.QRect(770, 80, 41, 41))
        self.NowPeople.setObjectName("NowPeople")
        self.RecommandBtn = QtWidgets.QPushButton(self.ChoosePeoplePage)
        self.RecommandBtn.setGeometry(QtCore.QRect(850, 40, 231, 101))
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(14)
        self.RecommandBtn.setFont(font)
        self.RecommandBtn.setStyleSheet("QPushButton{\n"
"    color: white;\n"
"    background-color: #FFB937        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FF8200;\n"
"    border-radius: 20px;\n"
"}")
        self.RecommandBtn.setObjectName("RecommandBtn")
        self.NextBtn = QtWidgets.QPushButton(self.ChoosePeoplePage)
        self.NextBtn.setGeometry(QtCore.QRect(1140, 40, 101, 101))
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(20)
        self.NextBtn.setFont(font)
        self.NextBtn.setStyleSheet("QPushButton{\n"
"    color: white;\n"
"    background-color: #FFB937        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FF8200;\n"
"    border-radius: 20px;\n"
"}")
        self.NextBtn.setObjectName("NextBtn")
        self.gridLayoutWidget = QtWidgets.QWidget(self.ChoosePeoplePage)
        self.gridLayoutWidget.setGeometry(QtCore.QRect(10, 180, 1261, 511))
        self.gridLayoutWidget.setObjectName("gridLayoutWidget")
        self.gridLayout = QtWidgets.QGridLayout(self.gridLayoutWidget)
        self.gridLayout.setContentsMargins(50, 50, 50, 50)
        self.gridLayout.setSpacing(100)
        self.gridLayout.setObjectName("gridLayout")
        self.Btn3 = QtWidgets.QPushButton(self.gridLayoutWidget)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.Btn3.sizePolicy().hasHeightForWidth())
        self.Btn3.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(20)
        self.Btn3.setFont(font)
        self.Btn3.setStyleSheet("QPushButton{\n"
"    color: #FF8200;\n"
"    background-color: #FFE650        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FFC81E;\n"
"    border-radius: 20px;\n"
"}")
        self.Btn3.setObjectName("Btn3")
        self.gridLayout.addWidget(self.Btn3, 0, 2, 1, 1)
        self.Btn5 = QtWidgets.QPushButton(self.gridLayoutWidget)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.Btn5.sizePolicy().hasHeightForWidth())
        self.Btn5.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(20)
        self.Btn5.setFont(font)
        self.Btn5.setStyleSheet("QPushButton{\n"
"    color: #FF8200;\n"
"    background-color: #FFE650        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FFC81E;\n"
"    border-radius: 20px;\n"
"}")
        self.Btn5.setObjectName("Btn5")
        self.gridLayout.addWidget(self.Btn5, 1, 0, 1, 1)
        self.Btn1 = QtWidgets.QPushButton(self.gridLayoutWidget)
        self.Btn1.setEnabled(True)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.Btn1.sizePolicy().hasHeightForWidth())
        self.Btn1.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(20)
        self.Btn1.setFont(font)
        self.Btn1.setContextMenuPolicy(QtCore.Qt.DefaultContextMenu)
        self.Btn1.setStyleSheet("QPushButton{\n"
"    color: #FF8200;\n"
"    background-color: #FFE650        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FFC81E;\n"
"    border-radius: 20px;\n"
"}")
        self.Btn1.setObjectName("Btn1")
        self.gridLayout.addWidget(self.Btn1, 0, 0, 1, 1)
        self.Btn6 = QtWidgets.QPushButton(self.gridLayoutWidget)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.Btn6.sizePolicy().hasHeightForWidth())
        self.Btn6.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(20)
        self.Btn6.setFont(font)
        self.Btn6.setStyleSheet("QPushButton{\n"
"    color: #FF8200;\n"
"    background-color: #FFE650        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FFC81E;\n"
"    border-radius: 20px;\n"
"}")
        self.Btn6.setObjectName("Btn6")
        self.gridLayout.addWidget(self.Btn6, 1, 1, 1, 1)
        self.Btn2 = QtWidgets.QPushButton(self.gridLayoutWidget)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.Btn2.sizePolicy().hasHeightForWidth())
        self.Btn2.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(20)
        self.Btn2.setFont(font)
        self.Btn2.setStyleSheet("QPushButton{\n"
"    color: #FF8200;\n"
"    background-color: #FFE650        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FFC81E;\n"
"    border-radius: 20px;\n"
"}")
        self.Btn2.setObjectName("Btn2")
        self.gridLayout.addWidget(self.Btn2, 0, 1, 1, 1)
        self.Btn4 = QtWidgets.QPushButton(self.gridLayoutWidget)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.Btn4.sizePolicy().hasHeightForWidth())
        self.Btn4.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(20)
        self.Btn4.setFont(font)
        self.Btn4.setStyleSheet("QPushButton{\n"
"    color: #FF8200;\n"
"    background-color: #FFE650        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FFC81E;\n"
"    border-radius: 20px;\n"
"}")
        self.Btn4.setObjectName("Btn4")
        self.gridLayout.addWidget(self.Btn4, 0, 3, 1, 1)
        self.Btn7 = QtWidgets.QPushButton(self.gridLayoutWidget)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.Btn7.sizePolicy().hasHeightForWidth())
        self.Btn7.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(20)
        self.Btn7.setFont(font)
        self.Btn7.setStyleSheet("QPushButton{\n"
"    color: #FF8200;\n"
"    background-color: #FFE650        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FFC81E;\n"
"    border-radius: 20px;\n"
"}")
        self.Btn7.setObjectName("Btn7")
        self.gridLayout.addWidget(self.Btn7, 1, 2, 1, 1)
        self.Btn8 = QtWidgets.QPushButton(self.gridLayoutWidget)
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Preferred, QtWidgets.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.Btn8.sizePolicy().hasHeightForWidth())
        self.Btn8.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(20)
        self.Btn8.setFont(font)
        self.Btn8.setStyleSheet("QPushButton{\n"
"    color: #FF8200;\n"
"    background-color: #FFE650        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FFC81E;\n"
"    border-radius: 20px;\n"
"}")
        self.Btn8.setObjectName("Btn8")
        self.gridLayout.addWidget(self.Btn8, 1, 3, 1, 1)
        self.stack.addWidget(self.ChoosePeoplePage)
        self.ShotPage = QtWidgets.QWidget()
        self.ShotPage.setObjectName("ShotPage")
        self.Btn_Already = QtWidgets.QPushButton(self.ShotPage)
        self.Btn_Already.setGeometry(QtCore.QRect(410, 230, 471, 311))
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(24)
        self.Btn_Already.setFont(font)
        self.Btn_Already.setAutoFillBackground(False)
        self.Btn_Already.setStyleSheet("QPushButton{\n"
"    color: #FF8200;\n"
"    background-color: #FFE650        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FFC81E;\n"
"    border-radius: 20px;\n"
"}")
        self.Btn_Already.setAutoDefault(False)
        self.Btn_Already.setDefault(False)
        self.Btn_Already.setFlat(False)
        self.Btn_Already.setObjectName("Btn_Already")
        self.Btn_Back_2 = QtWidgets.QPushButton(self.ShotPage)
        self.Btn_Back_2.setGeometry(QtCore.QRect(50, 40, 81, 71))
        self.Btn_Back_2.setStyleSheet("QPushButton{\n"
"    color: white;\n"
"    background-color: #FFB937        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FF8200;\n"
"    border-radius: 20px;\n"
"}")
        self.Btn_Back_2.setObjectName("Btn_Back_2")
        self.stack.addWidget(self.ShotPage)
        self.PhotoPage = QtWidgets.QWidget()
        self.PhotoPage.setObjectName("PhotoPage")
        self.gridLayoutWidget_3 = QtWidgets.QWidget(self.PhotoPage)
        self.gridLayoutWidget_3.setGeometry(QtCore.QRect(20, 20, 1111, 681))
        self.gridLayoutWidget_3.setObjectName("gridLayoutWidget_3")
        self.gridLayout_3 = QtWidgets.QGridLayout(self.gridLayoutWidget_3)
        self.gridLayout_3.setContentsMargins(85, 25, 85, 25)
        self.gridLayout_3.setHorizontalSpacing(142)
        self.gridLayout_3.setVerticalSpacing(32)
        self.gridLayout_3.setObjectName("gridLayout_3")
        self.Photo3 = QtWidgets.QLabel(self.gridLayoutWidget_3)
        self.Photo3.setStyleSheet("QLabel{\n"
"    border : 3px double #ABF760;\n"
"}")
        self.Photo3.setAlignment(QtCore.Qt.AlignCenter)
        self.Photo3.setObjectName("Photo3")
        self.gridLayout_3.addWidget(self.Photo3, 1, 0, 1, 1)
        self.Photo1 = QtWidgets.QLabel(self.gridLayoutWidget_3)
        self.Photo1.setStyleSheet("QLabel{\n"
"    border : 3px double #ABF760;\n"
"}")
        self.Photo1.setAlignment(QtCore.Qt.AlignCenter)
        self.Photo1.setObjectName("Photo1")
        self.gridLayout_3.addWidget(self.Photo1, 0, 0, 1, 1)
        self.Photo2 = QtWidgets.QLabel(self.gridLayoutWidget_3)
        self.Photo2.setStyleSheet("QLabel{\n"
"    border : 3px double #ABF760;\n"
"}")
        self.Photo2.setAlignment(QtCore.Qt.AlignCenter)
        self.Photo2.setObjectName("Photo2")
        self.gridLayout_3.addWidget(self.Photo2, 0, 1, 1, 1)
        self.Photo4 = QtWidgets.QLabel(self.gridLayoutWidget_3)
        self.Photo4.setStyleSheet("QLabel{\n"
"    border : 3px double #ABF760;\n"
"}")
        self.Photo4.setAlignment(QtCore.Qt.AlignCenter)
        self.Photo4.setObjectName("Photo4")
        self.gridLayout_3.addWidget(self.Photo4, 1, 1, 1, 1)
        self.NextBtn_3 = QtWidgets.QPushButton(self.PhotoPage)
        self.NextBtn_3.setGeometry(QtCore.QRect(1160, 600, 91, 91))
        self.NextBtn_3.setStyleSheet("QPushButton{\n"
"    color: white;\n"
"    background-color: #FFB937        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FF8200;\n"
"    border-radius: 20px;\n"
"}")
        self.NextBtn_3.setObjectName("NextBtn_3")
        self.label_2 = QtWidgets.QLabel(self.PhotoPage)
        self.label_2.setGeometry(QtCore.QRect(20, 20, 1111, 681))
        self.label_2.setStyleSheet("QLabel{\n"
"    border : 3px solid black;\n"
"}")
        self.label_2.setText("")
        self.label_2.setObjectName("label_2")
        self.label_2.raise_()
        self.gridLayoutWidget_3.raise_()
        self.NextBtn_3.raise_()
        self.stack.addWidget(self.PhotoPage)
        self.ChooseFramePage = QtWidgets.QWidget()
        self.ChooseFramePage.setObjectName("ChooseFramePage")
        self.label_5 = QtWidgets.QLabel(self.ChooseFramePage)
        self.label_5.setGeometry(QtCore.QRect(50, 50, 571, 71))
        self.label_5.setObjectName("label_5")
        self.label_6 = QtWidgets.QLabel(self.ChooseFramePage)
        self.label_6.setGeometry(QtCore.QRect(30, 110, 591, 31))
        self.label_6.setObjectName("label_6")
        self.line_3 = QtWidgets.QFrame(self.ChooseFramePage)
        self.line_3.setGeometry(QtCore.QRect(0, 160, 1281, 20))
        self.line_3.setFrameShape(QtWidgets.QFrame.HLine)
        self.line_3.setFrameShadow(QtWidgets.QFrame.Sunken)
        self.line_3.setObjectName("line_3")
        self.label_8 = QtWidgets.QLabel(self.ChooseFramePage)
        self.label_8.setGeometry(QtCore.QRect(980, 260, 191, 201))
        self.label_8.setAlignment(QtCore.Qt.AlignCenter)
        self.label_8.setIndent(0)
        self.label_8.setObjectName("label_8")
        self.PrintBtn = QtWidgets.QPushButton(self.ChooseFramePage)
        self.PrintBtn.setGeometry(QtCore.QRect(970, 520, 211, 161))
        self.PrintBtn.setStyleSheet("QPushButton{\n"
"    color: white;\n"
"    background-color: #FFB937        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FF8200;\n"
"    border-radius: 20px;\n"
"}\n"
"")
        self.PrintBtn.setObjectName("PrintBtn")
        self.ApplyBtn = QtWidgets.QPushButton(self.ChooseFramePage)
        self.ApplyBtn.setGeometry(QtCore.QRect(1150, 40, 101, 91))
        self.ApplyBtn.setStyleSheet("QPushButton{\n"
"    color: white;\n"
"    background-color: #FFB937        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FF8200;\n"
"    border-radius: 20px;\n"
"}")
        self.ApplyBtn.setObjectName("ApplyBtn")
        self.lineEdit = QtWidgets.QLineEdit(self.ChooseFramePage)
        self.lineEdit.setGeometry(QtCore.QRect(910, 60, 201, 51))
        self.lineEdit.setObjectName("lineEdit")
        self.label_9 = QtWidgets.QLabel(self.ChooseFramePage)
        self.label_9.setGeometry(QtCore.QRect(700, 50, 201, 71))
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(14)
        self.label_9.setFont(font)
        self.label_9.setObjectName("label_9")
        self.Basic_Frame_1 = QtWidgets.QPushButton(self.ChooseFramePage)
        self.Basic_Frame_1.setGeometry(QtCore.QRect(50, 260, 300, 80))
        self.Basic_Frame_1.setStyleSheet("background-color : #FFFFFF")
        self.Basic_Frame_1.setText("")
        self.Basic_Frame_1.setObjectName("Basic_Frame_1")
        self.label_7 = QtWidgets.QLabel(self.ChooseFramePage)
        self.label_7.setGeometry(QtCore.QRect(220, 190, 381, 41))
        self.label_7.setObjectName("label_7")
        self.Basic_Frame_2 = QtWidgets.QPushButton(self.ChooseFramePage)
        self.Basic_Frame_2.setGeometry(QtCore.QRect(50, 370, 300, 80))
        self.Basic_Frame_2.setStyleSheet("background-color : #D2D2FF")
        self.Basic_Frame_2.setText("")
        self.Basic_Frame_2.setObjectName("Basic_Frame_2")
        self.Basic_Frame_3 = QtWidgets.QPushButton(self.ChooseFramePage)
        self.Basic_Frame_3.setGeometry(QtCore.QRect(50, 480, 300, 80))
        self.Basic_Frame_3.setStyleSheet("background-color : #32F1FF    ")
        self.Basic_Frame_3.setText("")
        self.Basic_Frame_3.setObjectName("Basic_Frame_3")
        self.Basic_Frame_4 = QtWidgets.QPushButton(self.ChooseFramePage)
        self.Basic_Frame_4.setGeometry(QtCore.QRect(50, 590, 300, 80))
        self.Basic_Frame_4.setStyleSheet("background-color : #FFD4DF    ")
        self.Basic_Frame_4.setText("")
        self.Basic_Frame_4.setObjectName("Basic_Frame_4")
        self.Basic_Frame_5 = QtWidgets.QPushButton(self.ChooseFramePage)
        self.Basic_Frame_5.setGeometry(QtCore.QRect(460, 260, 300, 80))
        self.Basic_Frame_5.setStyleSheet("background-color : #FAFAA0    ")
        self.Basic_Frame_5.setText("")
        self.Basic_Frame_5.setObjectName("Basic_Frame_5")
        self.Basic_Frame_6 = QtWidgets.QPushButton(self.ChooseFramePage)
        self.Basic_Frame_6.setGeometry(QtCore.QRect(460, 370, 300, 80))
        self.Basic_Frame_6.setStyleSheet("background-color :#957745    ")
        self.Basic_Frame_6.setText("")
        self.Basic_Frame_6.setObjectName("Basic_Frame_6")
        self.Basic_Frame_7 = QtWidgets.QPushButton(self.ChooseFramePage)
        self.Basic_Frame_7.setGeometry(QtCore.QRect(460, 490, 300, 80))
        self.Basic_Frame_7.setStyleSheet("background-color : #8c8c8c")
        self.Basic_Frame_7.setText("")
        self.Basic_Frame_7.setObjectName("Basic_Frame_7")
        self.Basic_Frame_8 = QtWidgets.QPushButton(self.ChooseFramePage)
        self.Basic_Frame_8.setGeometry(QtCore.QRect(460, 600, 300, 80))
        self.Basic_Frame_8.setStyleSheet("background-color : #94EB3E")
        self.Basic_Frame_8.setText("")
        self.Basic_Frame_8.setObjectName("Basic_Frame_8")
        self.label_12 = QtWidgets.QLabel(self.ChooseFramePage)
        self.label_12.setGeometry(QtCore.QRect(870, 190, 401, 41))
        self.label_12.setObjectName("label_12")
        self.stack.addWidget(self.ChooseFramePage)
        self.PrintingPage = QtWidgets.QWidget()
        self.PrintingPage.setObjectName("PrintingPage")
        self.label_10 = QtWidgets.QLabel(self.PrintingPage)
        self.label_10.setGeometry(QtCore.QRect(250, 270, 691, 161))
        self.label_10.setObjectName("label_10")
        self.stack.addWidget(self.PrintingPage)
        self.DonePrinting = QtWidgets.QWidget()
        self.DonePrinting.setObjectName("DonePrinting")
        self.label_11 = QtWidgets.QLabel(self.DonePrinting)
        self.label_11.setGeometry(QtCore.QRect(0, 250, 1281, 211))
        self.label_11.setObjectName("label_11")
        self.stack.addWidget(self.DonePrinting)
        self.TopStack = QtWidgets.QStackedWidget(self.centralwidget)
        self.TopStack.setGeometry(QtCore.QRect(0, 0, 1280, 660))
        sizePolicy = QtWidgets.QSizePolicy(QtWidgets.QSizePolicy.Fixed, QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.TopStack.sizePolicy().hasHeightForWidth())
        self.TopStack.setSizePolicy(sizePolicy)
        self.TopStack.setStyleSheet("background-color : #FFF7E7")
        self.TopStack.setObjectName("TopStack")
        self.LogoPage = QtWidgets.QWidget()
        self.LogoPage.setObjectName("LogoPage")
        self.LogoImg = QtWidgets.QLabel(self.LogoPage)
        self.LogoImg.setGeometry(QtCore.QRect(540, 230, 200, 200))
        self.LogoImg.setStyleSheet("border-image:url(\'./logo.png\')")
        self.LogoImg.setText("")
        self.LogoImg.setAlignment(QtCore.Qt.AlignCenter)
        self.LogoImg.setObjectName("LogoImg")
        self.TopStack.addWidget(self.LogoPage)
        self.RecommandPosePage = QtWidgets.QWidget()
        self.RecommandPosePage.setObjectName("RecommandPosePage")
        self.PoseImg = QtWidgets.QLabel(self.RecommandPosePage)
        self.PoseImg.setGeometry(QtCore.QRect(240, 30, 800, 600))
        self.PoseImg.setStyleSheet("QLabel{\n"
"    border : 3px solid black;\n"
"}")
        self.PoseImg.setAlignment(QtCore.Qt.AlignCenter)
        self.PoseImg.setObjectName("PoseImg")
        self.LeftBtn = QtWidgets.QPushButton(self.RecommandPosePage)
        self.LeftBtn.setGeometry(QtCore.QRect(60, 265, 130, 130))
        self.LeftBtn.setStyleSheet("QPushButton{\n"
"    color: white;\n"
"    background-color: #FFB937        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FF8200;\n"
"    border-radius: 20px;\n"
"}")
        self.LeftBtn.setObjectName("LeftBtn")
        self.RightBtn = QtWidgets.QPushButton(self.RecommandPosePage)
        self.RightBtn.setGeometry(QtCore.QRect(1090, 265, 130, 130))
        self.RightBtn.setStyleSheet("QPushButton{\n"
"    color: white;\n"
"    background-color: #FFB937        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FF8200;\n"
"    border-radius: 20px;\n"
"}")
        self.RightBtn.setObjectName("RightBtn")
        self.Btn_close = QtWidgets.QPushButton(self.RecommandPosePage)
        self.Btn_close.setGeometry(QtCore.QRect(60, 560, 131, 71))
        self.Btn_close.setStyleSheet("QPushButton{\n"
"    color: white;\n"
"    background-color: #FFB937        ;\n"
"    padding: 12px;\n"
"    border-radius: 4px;\n"
"    border-bottom: 4px solid #FF8200;\n"
"    border-radius: 20px;\n"
"}")
        self.Btn_close.setObjectName("Btn_close")
        self.NowPeople_2 = QtWidgets.QLabel(self.RecommandPosePage)
        self.NowPeople_2.setGeometry(QtCore.QRect(70, 40, 121, 81))
        self.NowPeople_2.setObjectName("NowPeople_2")
        self.TopStack.addWidget(self.RecommandPosePage)
        self.ShotPage_Top = QtWidgets.QWidget()
        self.ShotPage_Top.setObjectName("ShotPage_Top")
        self.Label_Camera = QtWidgets.QLabel(self.ShotPage_Top)
        self.Label_Camera.setGeometry(QtCore.QRect(240, 30, 800, 600))
        self.Label_Camera.setStyleSheet("QLabel{\n"
"    border : 3px solid black;\n"
"}")
        self.Label_Camera.setAlignment(QtCore.Qt.AlignCenter)
        self.Label_Camera.setObjectName("Label_Camera")
        self.Label_Timer = QtWidgets.QLabel(self.ShotPage_Top)
        self.Label_Timer.setGeometry(QtCore.QRect(30, 40, 161, 201))
        font = QtGui.QFont()
        font.setFamily("AcadEref")
        font.setPointSize(36)
        self.Label_Timer.setFont(font)
        self.Label_Timer.setAlignment(QtCore.Qt.AlignCenter)
        self.Label_Timer.setObjectName("Label_Timer")
        self.TopStack.addWidget(self.ShotPage_Top)
        self.CheckPhoto = QtWidgets.QWidget()
        self.CheckPhoto.setObjectName("CheckPhoto")
        self.Top_Big_Photo = QtWidgets.QLabel(self.CheckPhoto)
        self.Top_Big_Photo.setGeometry(QtCore.QRect(240, 30, 800, 600))
        self.Top_Big_Photo.setStyleSheet("QLabel{\n"
"    border : 3px solid black;\n"
"}")
        self.Top_Big_Photo.setAlignment(QtCore.Qt.AlignCenter)
        self.Top_Big_Photo.setObjectName("Top_Big_Photo")
        self.TopStack.addWidget(self.CheckPhoto)
        self.page_3 = QtWidgets.QWidget()
        self.page_3.setObjectName("page_3")
        self.PhotoPlusFrame = QtWidgets.QLabel(self.page_3)
        self.PhotoPlusFrame.setGeometry(QtCore.QRect(240, 30, 800, 600))
        self.PhotoPlusFrame.setContextMenuPolicy(QtCore.Qt.DefaultContextMenu)
        self.PhotoPlusFrame.setStyleSheet("QLabel{\n"
"    border : 3px solid black;\n"
"}")
        self.PhotoPlusFrame.setAlignment(QtCore.Qt.AlignCenter)
        self.PhotoPlusFrame.setObjectName("PhotoPlusFrame")
        self.TopStack.addWidget(self.page_3)
        MainWindow.setCentralWidget(self.centralwidget)

        self.retranslateUi(MainWindow)
        self.stack.setCurrentIndex(4)
        self.TopStack.setCurrentIndex(4)
        self.RecommandBtn.clicked.connect(MainWindow.RecommandPose) # type: ignore
        self.NextBtn.clicked.connect(MainWindow.NextBottomButton_to_2) # type: ignore
        self.Btn1.clicked.connect(MainWindow.Press_Btn1) # type: ignore
        self.Btn2.clicked.connect(MainWindow.Press_Btn2) # type: ignore
        self.Btn3.clicked.connect(MainWindow.Press_Btn3) # type: ignore
        self.Btn4.clicked.connect(MainWindow.Press_Btn4) # type: ignore
        self.Btn5.clicked.connect(MainWindow.Press_Btn5) # type: ignore
        self.Btn6.clicked.connect(MainWindow.Press_Btn6) # type: ignore
        self.Btn7.clicked.connect(MainWindow.Press_Btn7) # type: ignore
        self.Btn8.clicked.connect(MainWindow.Press_Btn8) # type: ignore
        self.Btn_Already.clicked.connect(MainWindow.Press_PreparedBtn) # type: ignore
        self.Btn_Back_2.clicked.connect(MainWindow.Press_Back) # type: ignore
        self.NextBtn_3.clicked.connect(MainWindow.NextBottomButton_to_4) # type: ignore
        self.PrintBtn.clicked.connect(MainWindow.Press_Printing) # type: ignore
        self.ApplyBtn.clicked.connect(MainWindow.Press_Applying) # type: ignore
        self.Btn_close.clicked.connect(MainWindow.Press_CloseBtn) # type: ignore
        self.Basic_Frame_1.clicked.connect(MainWindow.Press_BasicFrame1) # type: ignore
        self.Basic_Frame_2.clicked.connect(MainWindow.Press_BasicFrame2) # type: ignore
        self.Basic_Frame_3.clicked.connect(MainWindow.Press_BasicFrame3) # type: ignore
        self.Basic_Frame_4.clicked.connect(MainWindow.Press_BasicFrame4) # type: ignore
        self.Basic_Frame_5.clicked.connect(MainWindow.Press_BasicFrame5) # type: ignore
        self.Basic_Frame_6.clicked.connect(MainWindow.Press_BasicFrame6) # type: ignore
        self.Basic_Frame_7.clicked.connect(MainWindow.Press_BasicFrame7) # type: ignore
        self.Basic_Frame_8.clicked.connect(MainWindow.Press_BasicFrame8) # type: ignore
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.label.setText(_translate("MainWindow", "<html><head/><body><p align=\"center\"><span style=\" font-size:16pt; font-weight:600;\">터치하여 PhoRest를 시작해 보세요</span></p></body></html>"))
        self.label_3.setText(_translate("MainWindow", "<html><head/><body><p align=\"center\"><span style=\" font-size:14pt; font-weight:600;\">촬영할 인원수를 선택해주세요</span></p></body></html>"))
        self.label_4.setText(_translate("MainWindow", "<html><head/><body><p><span style=\" font-size:11pt; font-weight:600;\">설정된 인원수 : </span></p></body></html>"))
        self.NowPeople.setText(_translate("MainWindow", "<html><head/><body><p><span style=\" font-size:11pt; font-weight:600;\">N명</span></p></body></html>"))
        self.RecommandBtn.setText(_translate("MainWindow", "추천 포즈"))
        self.NextBtn.setText(_translate("MainWindow", ">"))
        self.Btn3.setText(_translate("MainWindow", "3명"))
        self.Btn5.setText(_translate("MainWindow", "5명"))
        self.Btn1.setText(_translate("MainWindow", "1명"))
        self.Btn6.setText(_translate("MainWindow", "6명"))
        self.Btn2.setText(_translate("MainWindow", "2명"))
        self.Btn4.setText(_translate("MainWindow", "4명"))
        self.Btn7.setText(_translate("MainWindow", "7명"))
        self.Btn8.setText(_translate("MainWindow", "8명"))
        self.Btn_Already.setText(_translate("MainWindow", "촬영 시작"))
        self.Btn_Back_2.setText(_translate("MainWindow", "뒤로"))
        self.Photo3.setText(_translate("MainWindow", "이미지 3"))
        self.Photo1.setText(_translate("MainWindow", "이미지 1"))
        self.Photo2.setText(_translate("MainWindow", "이미지 2"))
        self.Photo4.setText(_translate("MainWindow", "이미지 4"))
        self.NextBtn_3.setText(_translate("MainWindow", ">"))
        self.label_5.setText(_translate("MainWindow", "<html><head/><body><p><span style=\" font-size:20pt; font-weight:600;\">사용할 프레임을 선택해주세요</span></p></body></html>"))
        self.label_6.setText(_translate("MainWindow", "<html><head/><body><p><span style=\" font-size:8pt; font-weight:600;\">기본 프레임 외의 프레임을 사용하고 싶다면 고유 프레임 번호를 입력하세요 </span></p></body></html>"))
        self.label_8.setText(_translate("MainWindow", "QR코드"))
        self.PrintBtn.setText(_translate("MainWindow", "Print"))
        self.ApplyBtn.setText(_translate("MainWindow", "적용"))
        self.label_9.setText(_translate("MainWindow", "<html><head/><body><p><span style=\" font-size:11pt; font-weight:600;\">고유프레임 번호 :</span></p></body></html>"))
        self.label_7.setText(_translate("MainWindow", "<html><head/><body><p align=\"center\"><span style=\" font-size:12pt; font-weight:600;\">기본 프레임을 클릭하여 선택하세요.</span></p></body></html>"))
        self.label_12.setText(_translate("MainWindow", "<html><head/><body><p align=\"center\"><span style=\" font-size:12pt; font-weight:600;\">QR코드로 인기있는 프레임을 살펴보세요</span></p></body></html>"))
        self.label_10.setText(_translate("MainWindow", "<html><head/><body><p align=\"center\">이 화면 건너 뛰네;;</p></body></html>"))
        self.label_11.setText(_translate("MainWindow", "<html><head/><body><p align=\"center\"><span style=\" font-size:14pt; font-weight:600;\">인쇄 중입니다...</span></p><p align=\"center\"><span style=\" font-size:14pt; font-weight:600;\"><br/></span></p><p align=\"center\"><span style=\" font-size:14pt; font-weight:600;\">인쇄가 완료된 후 아무 곳이나 클릭하여 초기 화면으로 돌아가세요<br/></span></p></body></html>"))
        self.PoseImg.setText(_translate("MainWindow", "포즈 이미지"))
        self.LeftBtn.setText(_translate("MainWindow", "왼쪽"))
        self.RightBtn.setText(_translate("MainWindow", "오른쪽"))
        self.Btn_close.setText(_translate("MainWindow", "닫기"))
        self.NowPeople_2.setText(_translate("MainWindow", "<html><head/><body><p align=\"center\"><span style=\" font-size:11pt; font-weight:600;\">N명</span></p></body></html>"))
        self.Label_Camera.setText(_translate("MainWindow", "카메라 화면 띄워줄 공간"))
        self.Label_Timer.setText(_translate("MainWindow", "<html><head/><body><p align=\"center\"><span style=\" font-size:48pt; font-weight:600;\">15</span></p></body></html>"))
        self.Top_Big_Photo.setText(_translate("MainWindow", "이미지 크게 보여줄 공간"))
        self.PhotoPlusFrame.setText(_translate("MainWindow", "프레임 적용 이미지를 띄워줄 예정"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
