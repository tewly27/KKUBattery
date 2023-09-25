import qrcode
imei = '0868755125135442'
img = qrcode.make('https://uvolt360.kku.ac.th/#' + '0868755125135442')
img.save(imei+".png")