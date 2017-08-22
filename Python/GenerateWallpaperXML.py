#!/usr/bin/python
import os

xmlfilename = 'mybackground.xml'
duration = 300.0
transition = 2.0
header = '''
  <starttime>
    <year>2009</year>
    <month>08</month>
    <day>04</day>
    <hour>00</hour>
    <minute>00</minute>
    <second>00</second>
  </starttime>
'''
xml_obj = open(xmlfilename, 'w')
xml_obj.write("<background>")
xml_obj.write(header)
xml_obj.write("<!-- This animation will start at midnight. -->")

lastfile = ''
files = [f for f in os.listdir('.') if ( f != os.path.basename(__file__) and f != xmlfilename)]
for f in files:
    if lastfile == '':
        lastfile = f
    else :
        xml_obj.write('''
  <static>
    <duration>%f</duration>
    <file>%s</file>
  </static>
  <transition>
    <duration>%f</duration>
    <from>%s</from>
    <to>%s</to>
  </transition>
  '''%(duration, os.path.join( os.getcwd(), lastfile ), transition, os.path.join( os.getcwd(), lastfile ), os.path.join( os.getcwd(), f )))
        lastfile = f

xml_obj.write('''
  <static>
    <duration>%f</duration>
    <file>%s</file>
  </static>
  <transition>
    <duration>%f</duration>
    <from>%s</from>
    <to>%s</to>
  </transition>
'''%(duration, os.path.join( os.getcwd(), lastfile ), transition, os.path.join( os.getcwd(), lastfile ), os.path.join( os.getcwd(), os.listdir('.')[0] )))
xml_obj.write("</background>")
xml_obj.close()