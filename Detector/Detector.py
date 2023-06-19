import cv2
import pytesseract
import requests
from tkinter import Tk, Label
from PIL import ImageTk, Image
import re


def cerrar_ventana():
    ventana.destroy()


url = 'https://parkingmiguel.miguelmarrod.es/indexprueba.php'
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'

harcascade = "IA.xml"

capE = cv2.VideoCapture(0)
capS = cv2.VideoCapture(1)

capE.set(3, 640)  # Anchura
capE.set(4, 480)  # Altura

capS.set(3, 640)  # Anchura
capS.set(4, 480)  # Altura

min_area = 800

while True:
    successE, imgE = capE.read()
    successS, imgS = capS.read()

    plate_cascade = cv2.CascadeClassifier(harcascade)
    img_grayE = cv2.cvtColor(imgE, cv2.COLOR_BGR2GRAY)
    img_grayS = cv2.cvtColor(imgS, cv2.COLOR_BGR2GRAY)

    platesE = plate_cascade.detectMultiScale(img_grayE, 1.05, 5)
    platesS = plate_cascade.detectMultiScale(img_grayS, 1.05, 5)

    for (x, y, w, h) in platesE:
        area = w * h

        if area > min_area:
            cv2.rectangle(imgE, (x,y), (x+w, y+h), (0,255,0), 2)
            cv2.putText(imgE, "Matricula", (x,y-5), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (255, 0, 255), 2)

            img_roiE = imgE[y:y+h, x:x+w]
            cv2.imshow("Entrada", img_roiE)

    for (x, y, w, h) in platesS:
        area = w * h

        if area > min_area:
            cv2.rectangle(imgS, (x,y), (x+w, y+h), (0,255,0), 2)
            cv2.putText(imgS, "Matricula", (x,y-5), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (255, 0, 255), 2)

            img_roiS = imgS[y: y+h, x:x+w]
            cv2.imshow("Salida", img_roiS)


    cv2.imshow("MatriculaEntrada", imgE)
    cv2.imshow("MatriculaSalida", imgS)

    key = cv2.waitKey(1) & 0xFF

    if key == ord('e'):
        if 'img_roiE' in locals():
            cv2.imwrite("Matricula/MatriculaEntrada.jpg", img_roiE)
            image = cv2.imread('Matricula/MatriculaEntrada.jpg')

            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            gray_image = cv2.bilateralFilter(gray_image, 11, 17, 17)

            edged = cv2.Canny(gray_image, 30, 200)

            cnts, new = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
            image1 = image.copy()
            cv2.drawContours(image1, cnts, -1, (0, 255, 0), 3)

            cnts = sorted(cnts, key=cv2.contourArea, reverse=True)[:30]
            screenCnt = None
            image2 = image.copy()
            cv2.drawContours(image2, cnts, -1, (0, 255, 0), 3)

            i = 7
            for c in cnts:
                perimeter = cv2.arcLength(c, True)
                approx = cv2.approxPolyDP(c, 0.018 * perimeter, True)
                if len(approx) == 4:
                    screenCnt = approx
                    x, y, w, h = cv2.boundingRect(c)
                    new_img = image[y:y + h, x:x + w]
                    cv2.imwrite('./DeteccionEntrada/' + str(i) + '.png', new_img)
                    i += 1
                    break

            Cropped_loc_e = './DeteccionEntrada/7.png'
            cv2.imshow("RecorteEntrada", cv2.imread(Cropped_loc_e))
            matricula = pytesseract.image_to_string(Cropped_loc_e, lang='eng')
            if matricula == "":
                print("No se ha detectado matrícula")
            else:
                print("La matrícula es:", matricula)
                matriculaSE = re.sub(r'\W+', '', matricula)
                print(matriculaSE)
                print("Esperando respuesta del servidor")
                cv2.waitKey(2000)
                data = {'matricula': matriculaSE, 'direccion': "entrada"}
                response = requests.post(url, data=data)

                if response.status_code == 200:
                    # La solicitud se realizó correctamente
                    print('Solicitud exitosa')

                    # Acceso al contenido de la respuesta
                    content = response.text
                    print('Contenido de la respuesta:', content)
                    if content == 'ADELANTE':
                        # Crea la instancia de Tk()
                        ventana = Tk()

                        # Configura la ventana
                        ventana.title("Abriendo puerta")
                        ventana.configure(background="green")

                        # Carga la imagen
                        imagen = Image.open("Carteles/AbriendoPuerta.png")
                        imagen = imagen.resize((400, 200), Image.LANCZOS)  # Ajusta el tamaño de la imagen utilizando LANCZOS
                        imagen_tk = ImageTk.PhotoImage(imagen)

                        # Crea un objeto Label para mostrar la imagen
                        imagen_label = Label(ventana, image=imagen_tk)
                        imagen_label.pack()

                        ventana.after(5000, cerrar_ventana)

                        # Muestra la ventana
                        ventana.mainloop()

                    if content == 'DENTRO':
                        # Crea la instancia de Tk()
                        ventana = Tk()

                        # Configura la ventana
                        ventana.title("Coche dentro")
                        ventana.configure(background="green")

                        # Carga la imagen
                        imagen = Image.open("Carteles/CocheDentro.png")
                        imagen = imagen.resize((400, 200), Image.LANCZOS)  # Ajusta el tamaño de la imagen utilizando LANCZOS
                        imagen_tk = ImageTk.PhotoImage(imagen)

                        # Crea un objeto Label para mostrar la imagen
                        imagen_label = Label(ventana, image=imagen_tk)
                        imagen_label.pack()

                        ventana.after(5000, cerrar_ventana)

                        # Muestra la ventana
                        ventana.mainloop()

                    if content == 'NODB':
                        # Crea la instancia de Tk()
                        ventana = Tk()

                        # Configura la ventana
                        ventana.title("Coche sin alta")
                        ventana.configure(background="green")

                        # Carga la imagen
                        imagen = Image.open("Carteles/CocheNoDB.png")
                        imagen = imagen.resize((400, 200), Image.LANCZOS)  # Ajusta el tamaño de la imagen utilizando LANCZOS
                        imagen_tk = ImageTk.PhotoImage(imagen)

                        # Crea un objeto Label para mostrar la imagen
                        imagen_label = Label(ventana, image=imagen_tk)
                        imagen_label.pack()

                        ventana.after(5000, cerrar_ventana)

                        # Muestra la ventana
                        ventana.mainloop()

                else:
                    # Ocurrió un error en la solicitud
                    print('Error en la solicitud:', response.status_code)
                    print('Mensaje de error:', response.text)
        else:
            print("No se ha detectado ninguna matrícula")

    if key == ord('s'):
        if 'img_roiS' in locals():
            cv2.imwrite("Matricula/MatriculaSalida.jpg", img_roiS)
            image = cv2.imread('Matricula/MatriculaSalida.jpg')

            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            gray_image = cv2.bilateralFilter(gray_image, 11, 17, 17)

            edged = cv2.Canny(gray_image, 30, 200)

            cnts, new = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
            image1 = image.copy()
            cv2.drawContours(image1, cnts, -1, (0, 255, 0), 3)

            cnts = sorted(cnts, key=cv2.contourArea, reverse=True)[:30]
            screenCnt = None
            image2 = image.copy()
            cv2.drawContours(image2, cnts, -1, (0, 255, 0), 3)

            i = 7
            for c in cnts:
                perimeter = cv2.arcLength(c, True)
                approx = cv2.approxPolyDP(c, 0.018 * perimeter, True)
                if len(approx) == 4:
                    screenCnt = approx
                    x, y, w, h = cv2.boundingRect(c)
                    new_img = image[y:y + h, x:x + w]
                    cv2.imwrite('./DeteccionSalida/' + str(i) + '.png', new_img)
                    i += 1
                    break

            Cropped_loc_s = './DeteccionSalida/7.png'
            cv2.imshow("RecorteSalida", cv2.imread(Cropped_loc_s))
            matricula = pytesseract.image_to_string(Cropped_loc_s, lang='eng')
            if matricula == "":
                print("No se ha detectado matrícula")
            else:
                print("La matrícula es:", matricula)
                matriculaSE = re.sub(r'\W+', '', matricula)
                print(matriculaSE)
                print("Esperando respuesta del servidor")
                cv2.waitKey(2000)
                data = {'matricula': matriculaSE, 'direccion': "salida"}
                response = requests.post(url, data=data)

                if response.status_code == 200:
                    # La solicitud se realizó correctamente
                    print('Solicitud exitosa')

                    # Acceso al contenido de la respuesta
                    content = response.text
                    print('Contenido de la respuesta:', content)
                    if content == 'ADELANTE':
                        # Crea la instancia de Tk()
                        ventana = Tk()

                        # Configura la ventana
                        ventana.title("Abriendo puerta")
                        ventana.configure(background="green")

                        # Carga la imagen
                        imagen = Image.open("Carteles/AbriendoPuerta.png")
                        imagen = imagen.resize((400, 200), Image.LANCZOS)  # Ajusta el tamaño de la imagen utilizando LANCZOS
                        imagen_tk = ImageTk.PhotoImage(imagen)

                        # Crea un objeto Label para mostrar la imagen
                        imagen_label = Label(ventana, image=imagen_tk)
                        imagen_label.pack()

                        ventana.after(5000, cerrar_ventana)

                        # Muestra la ventana
                        ventana.mainloop()

                    if content == 'FUERA':
                        # Crea la instancia de Tk()
                        ventana = Tk()

                        # Configura la ventana
                        ventana.title("Coche dentro")
                        ventana.configure(background="green")

                        # Carga la imagen
                        imagen = Image.open("Carteles/CocheFuera.png")
                        imagen = imagen.resize((400, 200),
                                               Image.LANCZOS)  # Ajusta el tamaño de la imagen utilizando LANCZOS
                        imagen_tk = ImageTk.PhotoImage(imagen)

                        # Crea un objeto Label para mostrar la imagen
                        imagen_label = Label(ventana, image=imagen_tk)
                        imagen_label.pack()

                        ventana.after(5000, cerrar_ventana)

                        # Muestra la ventana
                        ventana.mainloop()

                else:
                    # Ocurrió un error en la solicitud
                    print('Error en la solicitud:', response.status_code)
                    print('Mensaje de error:', response.text)

        else:
            print("No se ha detectado ninguna matrícula")

    if key == ord('q'):
        break
