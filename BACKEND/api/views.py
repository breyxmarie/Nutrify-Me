from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.files.storage import default_storage
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from django.http import HttpResponse
from .models import *
from .serializers import *

@csrf_exempt
def UserAPI(request, pk=0):
    # if request.method == 'GET':
    #     users = User.objects.all()
    #     user_serializer = UserSerializer(users, many=True)
    #     return JsonResponse(user_serializer.data, safe=False)

    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                user = User.objects.get(pk=pk)
                serializer = UserSerializer(user)
                return JsonResponse(serializer.data, safe=False)
            except User.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data = user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("User Added Successfully", safe=False)
        return JsonResponse("Failes to Add User", safe=False)
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        users = User.objects.get(user_id=user_data['user_id'])
        user_serializer = UserSerializer(users, data = user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Faile to Update", safe=False)
    elif request.method == 'DELETE':
        user = User.objects.get(user_id=pk)
        user.delete()
        return JsonResponse("User was deleted Successfully", safe = False)



@csrf_exempt
def NutritionistAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            nutritionist = Nutritionist.objects.all()
            serializer = NutritionistSerializer(nutritionist, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                nutritionist = Nutritionist.objects.get(pk=pk)
                serializer = NutritionistSerializer(nutritionist)
                return JsonResponse(serializer.data, safe=False)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Nutritionist not found'}, status=404)
    elif request.method == 'POST':
        nutritionist_data = JSONParser().parse(request)
        nutritionist_serializer = NutritionistSerializer(data = nutritionist_data)
        if nutritionist_serializer.is_valid():
            nutritionist_serializer.save()
            return JsonResponse("Nutritionist Added Successfully", safe=False)
        return JsonResponse("Failed to Add Nutritionist", safe=False)
    elif request.method == 'PUT':
        nutritionist_data = JSONParser().parse(request)
        nutritionists = Nutritionist.objects.get(nutritionist_id=nutritionist_data['nutritionist_id'])
        nutritionist_serializer = NutritionistSerializer(nutritionists, data = nutritionist_data)
        if nutritionist_serializer.is_valid():
            nutritionist_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        nutritionist = Nutritionist.objects.get(nutritionist_id=pk)
        nutritionist.delete()
        return JsonResponse("Nutritionist was deleted Successfully", safe = False)
    

@csrf_exempt
def AppointmentAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            appointment = Appointment.objects.all()
            serializer = AppointmentSerializer(appointment, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                appointment = Appointment.objects.get(pk=pk)
                serializer = AppointmentSerializer(appointment)
                return JsonResponse(serializer.data, safe=False)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Appointment not found'}, status=404)
    elif request.method == 'POST':
        appointment_data = JSONParser().parse(request)
        appointment_serializer = AppointmentSerializer(data = appointment_data)
        if appointment_serializer.is_valid():
            appointment_serializer.save()
            return JsonResponse("Appointment Added Successfully", safe=False)
        return JsonResponse("Failed to Add Appointment", safe=False)
    elif request.method == 'PUT':
        appointment_data = JSONParser().parse(request)
        appointments = Appointment.objects.get(appointment_id=appointment_data['appointment_id'])
        appointment_serializer = AppointmentSerializer(appointments, data = appointment_data)
        if appointment_serializer.is_valid():
            appointment_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        appointment = Appointment.objects.get(appointment_id=pk)
        appointment.delete()
        return JsonResponse("Appointment was deleted Successfully", safe = False)



def home(request):
    return HttpResponse("This is the homepage")
# Create your views here.
