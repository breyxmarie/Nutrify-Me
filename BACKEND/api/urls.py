from django.urls import path
from .views import *


urlpatterns = [

    path('', home),
    path('user/', UserAPI),
    path('user/<int:pk>', UserAPI),
    path('nutritionist/', NutritionistAPI),
    path('nutritionist/<int:pk>', NutritionistAPI),
    path('appointment', AppointmentAPI),
    path('appointment/<int:pk>', AppointmentAPI),
 
]