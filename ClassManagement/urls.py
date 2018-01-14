"""ClassManagement URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.views import login
from Home.views import home_page, logout_view
from Info_Manage.views import teacher_manage, class_manage, arrange_class, teacher_save_and_config
from Info_Search.views import info_search_main

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/login/$', login, {'template_name': 'login.html'}),
    url(r'^accounts/logout/$', logout_view),
    url(r'^$', home_page, name='home'),
    url(r'^teacher_manage/', teacher_manage),
    url(r'^teacher_save_and_config/', teacher_save_and_config),
    url(r'^class_manage/', class_manage),
    url(r'^arrange_class/', arrange_class),
    url(r'^info_search/', info_search_main),
]
