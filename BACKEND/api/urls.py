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
    path('nutritionistU/<int:user_id>', NutritionistAPIuser_id),
    path('appointment/', AppointmentAPI),
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
    path('cart/', CartAPI),
    path('cart/<int:pk>', CartAPI),
    path('address/', AddressAPI),
    path('address/<int:pk>', AddressAPI),
    path('order/', OrderAPI),
    path('order/<int:pk>', OrderAPI),
    path('journalentry/', JournalEntryAPI),
    path('journalentry/<int:pk>', JournalEntryAPI),  
    path('foodentry/', FoodEntryAPI),
    path('foodentry/<int:pk>', FoodEntryAPI),
    path('scheduledeck/', ScheduleDeckAPI),
    path('scheduledeck/<int:pk>', ScheduleDeckAPI),
    path('verifynutritionist/', VerifyNutritionistAPI),
    path('verifynutritionist/<int:pk>', VerifyNutritionistAPI), 
    path('generatedmeal/', GeneratedMealAPI),
    path('generated/<int:pk>', GeneratedMealAPI),
    path('requestedmeals/', RequestMealsAPI),
    path('requestedmeals/<int:pk>', RequestMealsAPI),
    path('theme/', ThemeAPI),
    path('theme/<int:pk>', ThemeAPI),
    path('deployedorder/', DeployedOrderAPI),
    path('deployedorder/<int:pk>', DeployedOrderAPI),
    path('savefilelicense', SaveFileLicense),


  #  path('SaveFile', SaveFile), 
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


