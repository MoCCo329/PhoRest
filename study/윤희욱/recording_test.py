import picamera
import time
import datetime
from os import system

with picamera.PiCamera() as camera:
    camera.resolution = (640,480)
    camera.start_recording(output = 'recording.h264')
    camera.wait_recording(5)
    camera.stop_recording()

system('MP4Box -add recording.h264 recording.mp4')