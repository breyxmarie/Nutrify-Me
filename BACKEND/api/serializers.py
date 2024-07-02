from rest_framework import fields, serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id',
                  'username',
                  'password',
                  'first_name',
                  'last_name',
                  'privilege', 'email', 'image', 'active')
        
class NutritionistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nutritionist
        fields = ('nutritionist_id',
                  'username',
                  'password',
                  'first_name',
                  'last_name',
                  'license_id',
                  'schedule_day' ,
                  'schedule_time',
                  'image',
                  'license_pic')
        
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('appointment_id',
                  'date',
                  'time',
                  'user_id',
                  'nutritionist_id')

# class VideoCallsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = VideoCalls
#         fields = ('video_id', 'meeting_id')



class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ('video_id', 'meeting_id')

class ShopMealPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopMealPlan
        fields = ('shop_mealplan_id', 'name', 'image', 'description', 'start_week', 'end_week', 'price')

class ShopMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopMeal
        fields = ('shop_meal_id', 
                  'mealplan_id', 
                  'type', 
                  'calories', 
                  'fat', 
                  'protein',
                  'carbs', 
                  'food', 
                  'image',
                  'day')

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('cart_id','user_id','orders') 


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('address_id','user_id','phone','address','name','default', 'postalcode') 

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('order_id','user_id','orders','date','status','address_id','payment','shipping', 'notes', 'totalprice', 'shipping_price')

class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ('journal_id','date','title','entry','systolic','diastolic', 'user_id')


class FoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodEntry
        fields = ('foodentry_id', 'type','food','calories','fat','protein','carbs','journal_id' )


class ScheduleDeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleDeck
        fields = ('schedule_id', 'nutritionist_id', 'time', 'date', 'type')

class VerifyNutritionistSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerifyNutritionist
        fields = ('verify_id',
                  'username',
                  'password',
                  'first_name',
                  'last_name',
                  'license_pic',
                  'email', 
                  'phone',
                  'license_id')