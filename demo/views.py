from django.shortcuts import render


def index(request):

    return render(request, "demo/temp.html")

def bayer(request):

    return render(request, "demo/index.html")

def semep59(request):
    return render(request, "demo/semEP_59.html")

def semep59json(request):
    return render(request, 'demo/semEP_59.json')

def semep59drugs(request):
    return render(request, 'demo/semEP_59.drugs')

def stylecysss(request):
    return render(request, 'demo/style.cycss')

def semep59js(request):
    return render(request, 'demo/semEP_59.js')


def semep74(request):
    return render(request, "demo/semEP_74.html")

def semep74json(request):
    return render(request, 'demo/semEP_74.json')

def semep74drugs(request):
    return render(request, 'demo/semEP_74.drugs')

def semep74js(request):
    return render(request, 'demo/semEP_74.js')


def semep168(request):
    return render(request, "demo/semEP_168.html")

def semep168json(request):
    return render(request, 'demo/semEP_168.json')

def semep168drugs(request):
    return render(request, 'demo/semEP_168.drugs')

def semep168drugsjs(request):
    return render(request, 'demo/semEP_168.drugs.js')

def semep168js(request):
    return render(request, 'demo/semEP_168.js')


def semep190(request):
    return render(request, "demo/semEP_190.html")

def semep190json(request):
    return render(request, 'demo/semEP_190.json')

def semep190drugs(request):
    return render(request, 'demo/semEP_190.drugs')

def semep190js(request):
    return render(request, 'demo/semEP_190.js')

def rdfmts(request):
    return render(request, 'demo/rdfmts.html')


def iasisrdfmts(request):
    return render(request, 'demo/iasisrdfmts.json')
