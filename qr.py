import qrcode
imei = '0868755123661050'
img = qrcode.make('https://uvolt360.kku.ac.th/#'+imei)
img.save(imei+".png")