from django.shortcuts import render

def index(request):
    return render(request, '<h1>Hi</h1>')
