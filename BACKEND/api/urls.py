from django.urls import path
from .views import *

from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [

    path('', home),
    path('user/', UserAPI),
    path('user/<int:pk>', UserAPI),
    path('nutritionist/', NutritionistAPI),
    path('nutritionist/<int:pk>', NutritionistAPI),
    path('appointment', AppointmentAPI),
    path('appointment/<int:pk>', AppointmentAPI),
    #path('video_calls', VideoCallsAPI),
    path('meeting/', MeetingAPI),
    path('shopmealplan/', ShopMealPlanAPI),
    path('shopmealplan/<int:pk>', ShopMealPlanAPI),
    path('shopmeal/', ShopMealAPI),
    path('shopmeal/<int:pk>', ShopMealAPI),
    path('savefile', SaveFile),
    path('shopmeal/savefile', SaveFile),
    path('shopmealplan/savefile', SaveFile),
    path('cart', CartAPI),
    path('cart/<int:pk>', CartAPI)
  #  path('SaveFile', SaveFile),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)