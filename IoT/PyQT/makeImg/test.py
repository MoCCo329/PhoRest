from PIL import Image, ImageDraw, ImageFont
from os import system
import datetime as dt
import qrcode

img1 = Image.open("./img1.jpg")
img2 = Image.open("./img2.jpg")
img3 = Image.open("./img3.jpg")
img4 = Image.open("./img4.jpg")

img_size = (600,425)

img1 = img1.resize(img_size)
img2 = img2.resize(img_size)
img3 = img3.resize(img_size)
img4 = img4.resize(img_size)

new_img = Image.new("RGB", (1500, 1000), '#B4FF52')
new_img.paste(img1, (50,50))
new_img.paste(img2, (img_size[0] + 100, 50))
new_img.paste(img3, (50, img_size[1] + 100))
new_img.paste(img4, (img_size[0] + 100, img_size[1] + 100))

#make QR code
qr = qrcode.QRCode(
    version = 1,
    error_correction = qrcode.constants.ERROR_CORRECT_H,
    box_size = 1,
    border = 1
    )

url = 'http://i7a101.p.ssafy.io/api/frame/'
qr.add_data(url)
qr.make()
qrimg = qr.make_image(fill_color='black', back_color='white')
qrimg.save('QRCodeImg.jpg')

qrcode = Image.open("./QRCodeImg.jpg")
qrcode = qrimg.resize((130,130))
new_img.paste(qrcode, ((img_size[0]*2) + 100 + 10, 1000 - 50 - 130))

#watermark
waterFont = ImageFont.truetype('./703.ttf', 60)
mark_width, mark_height = waterFont.getsize('PhoRest')
watermark = Image.new('RGBA', (mark_width, mark_height), (0, 0, 0, 0))
waterdraw = ImageDraw.Draw(watermark)
waterdraw.text((0,0), 'PhoRest', fill='#902CA8', font=waterFont, align='center')
watermark = watermark.rotate(90,expand=1)

new_img.paste(watermark, ((img_size[0]*2) + 100 + 10, 1000 - 50 - 130 - 20 - mark_width), watermark)

#datestr
time = dt.datetime.now()
datestr = time.strftime('%Y/%m/%d')
dateFont = ImageFont.truetype('./703.ttf', 30)
date_width, date_height = dateFont.getsize(datestr)
datemark = Image.new('RGBA', (date_width, date_height), (0, 0, 0, 0))
datedraw = ImageDraw.Draw(datemark)
datedraw.text((0,0), datestr, fill='black', font=dateFont, align='center')
datemark = datemark.rotate(90,expand=1)

new_img.paste(datemark, ((img_size[0]*2) + 100 + 10 + mark_height + 10, 1000 - 50 - 130 - 20 - date_width), datemark)


new_img.save("merged_img.jpg","JPEG")


#system('sudo lp -d epson ~/Desktop/pillow/merged_img.jpg')
