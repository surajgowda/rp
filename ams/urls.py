"""
URL configuration for ams project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from rp.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    # path('admin_dashboard/', admin_dashboard, name='admin'),
    # path('dashboard', user_dashboard, name='user'),
    path('feedback', feedback, name='feedback'),
    path('acknowledgement', thanks, name='thanks'),
    path('progam-1', prog1, name='prog1'),
    path('progam-2', prog2, name='prog2'),
    path('progam-3', prog3, name='prog3'),
    path('progam-7', prog7, name='prog7'),
    path('post-question', post_question, name='post_question'),
    path('post-answer/<int:question_id>', post_answer, name='post_answer'),
    path('progam-8', prog8, name='prog8'),
    path('progam-9', prog9, name='prog9'),
    path('binomial', binomial, name='binomial'),
    path('discussion', discussion, name='discussion'),
    path('normal', normal, name='normal'),
    path('poisson', poisson, name='poisson'),
    path('uniform', uniform, name='uniform'),
    path('student-t', student, name='student'),
    # path('profile', profile, name='profile'),
    path('logout', logout_view, name='logout'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
