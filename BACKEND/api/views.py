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
from django.core.files.storage import default_storage

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


@csrf_exempt
def MeetingAPI(request, pk=0):
    # if request.method == 'GET':
    #     users = User.objects.all()
    #     user_serializer = UserSerializer(users, many=True)
    #     return JsonResponse(user_serializer.data, safe=False)

    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            meetings = Meeting.objects.all()
            serializer = MeetingSerializer(meetings, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                meeting = Meeting.objects.get(pk=pk)
                serializer = MeetingSerializer(meeting)
                return JsonResponse(serializer.data, safe=False)
            except Meeting.DoesNotExist:
                return JsonResponse({'error': 'Meeting ID not found'}, status=404)
    elif request.method == 'POST':
        meeting_data = JSONParser().parse(request)
        meeting_serializer = MeetingSerializer(data = meeting_data)
        if meeting_serializer.is_valid():
            meeting_serializer.save()
            return JsonResponse("Meeting ID Added Successfully", safe=False)
        return JsonResponse("Failes to Add Meeting ID", safe=False)
    # elif request.method == 'PUT':
    #     videoCall_data = JSONParser().parse(request)
    #     videoCalls = VideoCall.objects.get(user_id=user_data['user_id'])
    #     user_serializer = UserSerializer(users, data = user_data)
    #     if user_serializer.is_valid():
    #         user_serializer.save()
    #         return JsonResponse("Update Successfully", safe=False)
    #     return JsonResponse("Faile to Update", safe=False)
    elif request.method == 'DELETE':
        meeting = Meeting.objects.get(user_id=pk)
        meeting.delete()
        return JsonResponse("Meeting deleted Successfully", safe = False)
    



# @csrf_exempt
# def ShopMealPlanAPI(request, pk=0):
#     if request.method == 'GET':
#         if pk == 0:  # Check if pk is not specified (meaning get all users)
#             shopmealPlan = ShopMealPlan.objects.all()
#             serializer = ShopMealPlanSerializer(shopmealPlan, many=True)  # Set many=True for multiple users
#             return JsonResponse(serializer.data, safe=False)
#         else:
#             # Existing logic for fetching a single user using pk
#             try:
#                 shopmealPlan = ShopMealPlan.objects.get(pk=pk)
#                 serializer = ShopMealPlanSerializer(shopmealPlan)
#                 return JsonResponse(serializer.data, safe=False)
#             except ShopMealPlan.DoesNotExist:
#                 return JsonResponse({'error': 'Meal Plan not found'}, status=404)
#     elif request.method == 'POST':
#         shopmealPlan_data = JSONParser().parse(request)
#         shopmealPlan_serializer = ShopMealPlanSerializer(data = shopmealPlan_data)
#         if shopmealPlan_serializer.is_valid():
#             shopmealPlan_serializer.save()
#             return JsonResponse("Meal Plan Added Successfully", safe=False)
#         return JsonResponse("Failed to Add Meal Plan", safe=False)
#     elif request.method == 'PUT':
#         shopmealPlan_data = JSONParser().parse(request)
#         shopmealPlans = ShopMealPlan.objects.get(mealPlan_id=shopmealPlan_data['shop_mealplan_id'])
#         shopmealPlan_serializer = NutritionistSerializer(shopmealPlans, data = shopmealPlan_data)
#         if shopmealPlan_serializer.is_valid():
#             shopmealPlan_serializer.save()
#             return JsonResponse("Update Successfully", safe=False)
#         return JsonResponse("Failed to Update", safe=False)
#     elif request.method == 'DELETE':
#         shopmealPlan = ShopMealPlan.objects.get(mealplan_id=pk)
#         shopmealPlan.delete()
#         return JsonResponse("Meal Plan was deleted Successfully", safe = False)

@csrf_exempt
def ShopMealPlanAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            shopMealPlan = ShopMealPlan.objects.all()
            serializer = ShopMealPlanSerializer(shopMealPlan, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                shopMealPlan = ShopMealPlan.objects.get(pk=pk)
                serializer = ShopMealPlanSerializer(shopMealPlan)
                return JsonResponse(serializer.data, safe=False)
            except ShopMealPlan.DoesNotExist:
                return JsonResponse({'error': 'Meal Plan not found'}, status=404)
    elif request.method == 'POST':
        shopMealPlan_data = JSONParser().parse(request)
        shopMealPlan_serializer = ShopMealPlanSerializer(data = shopMealPlan_data)
        if shopMealPlan_serializer.is_valid():
            shopMealPlan = shopMealPlan_serializer.save()
            response_data = {"id": shopMealPlan.pk, "message": "Meal Plan Added Successfully"}
            return JsonResponse(response_data , safe=False)
        return JsonResponse("Failed to Add Meal Plan", safe=False)
    elif request.method == 'PUT':
        shopMealPlan_data = JSONParser().parse(request)
        shopMealPlans = ShopMealPlan.objects.get(shop_mealplan_id=shopMealPlan_data['shop_mealplan_id'])
        shopMealPlan_serializer = AppointmentSerializer(shopMealPlans, data = shopMealPlan_data)
        if shopMealPlan_serializer.is_valid():
            shopMealPlan_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        shopMealPlan = Appointment.objects.get(appointment_id=pk)
        shopMealPlan.delete()
        return JsonResponse("Appointment was deleted Successfully", safe = False)


@csrf_exempt
def ShopMealAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            shopmeal = ShopMeal.objects.all()
            serializer = ShopMealSerializer(shopmeal, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                shopmeal = ShopMeal.objects.get(pk=pk)
                serializer = ShopMealSerializer(shopmeal)
                return JsonResponse(serializer.data, safe=False)
            except ShopMeal.DoesNotExist:
                return JsonResponse({'error': 'Meal not found'}, status=404)
    elif request.method == 'POST':
        shopmeal_data = JSONParser().parse(request)
        shopmeal_serializer = ShopMealSerializer(data = shopmeal_data)
        if shopmeal_serializer.is_valid():
            shopmeal_serializer.save()
            return JsonResponse("Meal Added Successfully", safe=False)
        return JsonResponse("Failed to Add Meal", safe=False)
    elif request.method == 'PUT':
        shopmeal_data = JSONParser().parse(request)
        shopmeals = ShopMeal.objects.get(meal_id=shopmeal_data['meal_id'])
        shopmeal_serializer = NutritionistSerializer(shopmeals, data = shopmeal_data)
        if shopmeal_serializer.is_valid():
            shopmeal_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        shopmeal = ShopMeal.objects.get(meal_id=pk)
        shopmeal.delete()
        return JsonResponse("Meal was deleted Successfully", safe = False)

@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)

def home(request):
    return HttpResponse("This is the homepage")
# Create your views here.



@csrf_exempt
def CartAPI(request, pk=0):
    # if request.method == 'GET':
    #     users = User.objects.all()
    #     user_serializer = UserSerializer(users, many=True)
    #     return JsonResponse(user_serializer.data, safe=False)

    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            carts = Cart.objects.all()
            serializer = CartSerializer(carts, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                cart = Cart.objects.get(pk=pk)
                serializer = CartSerializer(cart)
                return JsonResponse(serializer.data, safe=False)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Cart not found'}, status=404)
    elif request.method == 'POST':
        cart_data = JSONParser().parse(request)
        cart_serializer = CartSerializer(data = cart_data)
        if cart_serializer.is_valid():
            cart_serializer.save()
            return JsonResponse("Cart Added Successfully", safe=False)
        return JsonResponse("Failed to Add Cart", safe=False)
    elif request.method == 'PUT':
        cart_data = JSONParser().parse(request)
        carts = Cart.objects.get(cart_id=cart_data['cart_id'])
        cart_serializer = CartSerializer(carts, data = cart_data)
        if cart_serializer.is_valid():
            cart_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        cart = Cart.objects.get(user_id=pk)
        cart.delete()
        return JsonResponse("Cart was deleted Successfully", safe = False)




@csrf_exempt
def AddressAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            address = Address.objects.all()
            serializer = AddressSerializer(address, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                address = Address.objects.get(pk=pk)
                serializer = AddressSerializer(address)
                return JsonResponse(serializer.data, safe=False)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Address not found'}, status=404)
    elif request.method == 'POST':
        address_data = JSONParser().parse(request)
        address_serializer = AddressSerializer(data = address_data)
        if address_serializer.is_valid():
            address_serializer.save()
            return JsonResponse("Address Added Successfully", safe=False)
        return JsonResponse("Failed to Add Address", safe=False)
    elif request.method == 'PUT':
        address_data = JSONParser().parse(request)
        addresss = Address.objects.get(address_id=address_data['address_id'])
        address_serializer = AddressSerializer(addresss, data = address_data)
        if address_serializer.is_valid():
            address_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        address = Address.objects.get(address_id=pk)
        address.delete()
        return JsonResponse("Address was deleted Successfully", safe = False)