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
                  'privilege')
        
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
                  'schedule_time' ,)
        
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('appointment_id',
                  'date',
                  'time',
                  'user_id',
                  'nutritionist_id')