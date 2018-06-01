from django.shortcuts import render


def index(request):

    return render(request, "demo/temp.html")

def bayer(request):

    return render(request, "demo/index.html")