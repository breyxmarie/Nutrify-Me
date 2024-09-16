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
                  'license_pic', 'user_id')
        
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('appointment_id',
                  'date',
                  'time',
                  'user_id',
                  'nutritionist_id', 'kind')

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
        fields = ('address_id','user_id','phone','address','name','default', 'postalcode', 'longi', 'lang') 

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('order_id','user_id','orders','date','status','address_id','payment','shipping', 'notes', 'totalprice', 'shipping_price', 'payment_details', 'schedule_date')

class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ('journal_id','date','title','entry','systolic','diastolic', 'user_id', 'meal_plan')


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
        
class GeneratedMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedMeal
        fields = ('generatedMeal_id', 
                  'date', 
                  'meal', 
                  'user_id', 
                  'name', 
                  'age',
                  'gender',
                  'activity',
                  'goal',
                  'cuisine',
                  'diet',
                  'allergen', 
                  'height',
                  'weight')
        
class RequestMealsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestMeals
        fields = ('request_id', 'user_id','generatedMeal_id', 'date', 'status', 'price' )

class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = ('theme_id', 'primaryColor', 'secondaryColor', 'logo' )

class DeployedOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeployedOrder
        fields = ('deployed_id', 'user', 'order','address', 'order_details', 'date', 'time',
                   'status')
        
class ProfilingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiling
        fields = ('profiling_id', 'user_id', 'age', 'gender', 'targetCalories', 'common_sys', 'common_dia', 'hypertension', 'dateofBP', 'takingMeds', 'targetCalories')

class PendingAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingAppointment
        fields = ('date', 'time', 'user_id', 'nutritionist_id', 'status', 'kind', 'pending_id')

class PatientNutritionistAgreementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientNutritionistAgreement
        fields = ('agree_id', 'status', 'user_id', 'nutritionist_id')

class RecommendMealPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecommendMealPlan
        fields = ('recommend_mealplan_id', 'name','image','description' ,'nutritionist_id','user_id')

class RecommendMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecommendMeal
        fields = ('recommend_meal_id','recommend_mealplan_id','type','calories','fat','protein','carbs','food','image','day')