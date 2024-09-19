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
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os

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
        # if user_serializer.is_valid():
        #     user_serializer.save()
        #     return JsonResponse("User Added Successfully", safe=False)
        if user_serializer.is_valid():
            userEntry = user_serializer.save()
            response_data = {"id": userEntry.pk, "message": "user Added Successfully"}
            return JsonResponse(response_data, safe=False)

        return JsonResponse("Failed to Add User", safe=False)
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
def NutritionistAPIuser_id(request, user_id=0):
    if request.method == 'GET':
        if user_id:  # Check if pk is not specified (meaning get all users)
            try:
                nutritionist = Nutritionist.objects.get(user_id=user_id)
                serializer = NutritionistSerializer(nutritionist)
                return JsonResponse(serializer.data, safe=False)
            except Nutritionist.DoesNotExist:
                return JsonResponse({'error': 'Nutritionist not found'}, status=404)
  

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


@csrf_exempt
def SaveFileLicense(request):
    if request.method == 'POST' and request.FILES.get('file'):
        file = request.FILES['file']
        # Specify the directory where you want to save the file
        save_directory = os.path.join(settings.MEDIA_ROOT, 'license')
        fs = FileSystemStorage(location=save_directory)
        file_name = fs.save(file.name, file)
        return JsonResponse(file_name, safe=False)
    else:
        return JsonResponse({'error': 'No file found in request'}, status=400)




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
            except Cart.DoesNotExist:
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
        cart = Cart.objects.get(cart_id=pk)
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
    

@csrf_exempt
def OrderAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            order = Order.objects.all()
            serializer = OrderSerializer(order, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                order = Order.objects.get(pk=pk)
                serializer = OrderSerializer(order)
                return JsonResponse(serializer.data, safe=False)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Order not found'}, status=404)
    elif request.method == 'POST':
        order_data = JSONParser().parse(request)
        order_serializer = OrderSerializer(data = order_data)
        if order_serializer.is_valid():
            order_serializer.save()
            return JsonResponse("Order Added Successfully", safe=False)
        return JsonResponse("Failed to Add Order", safe=False)
    elif request.method == 'PUT':
        order_data = JSONParser().parse(request)
        orders = Order.objects.get(order_id=order_data['order_id'])
        order_serializer = OrderSerializer(orders, data = order_data)
        if order_serializer.is_valid():
            order_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        order = Order.objects.get(order_id=pk)
        order.delete()
        return JsonResponse("Order was deleted Successfully", safe = False)
    


@csrf_exempt
def JournalEntryAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            journalEntry = JournalEntry.objects.all()
            serializer = JournalEntrySerializer(journalEntry, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                journalEntry = JournalEntry.objects.get(pk=pk)
                serializer = JournalEntrySerializer(journalEntry)
                return JsonResponse(serializer.data, safe=False)
            except JournalEntry.DoesNotExist:
                return JsonResponse({'error': 'Journal Entry not found'}, status=404)
    elif request.method == 'POST':
        journalEntry_data = JSONParser().parse(request)
        journalEntry_serializer = JournalEntrySerializer(data = journalEntry_data)
        if journalEntry_serializer.is_valid():
            foodEntry = journalEntry_serializer.save()
            response_data = {"id": foodEntry.pk, "message": "Journal Entry Added Successfully"}
            return JsonResponse(response_data, safe=False)
     
    elif request.method == 'PUT':
        journalEntry_data = JSONParser().parse(request)
        journalEntrys = JournalEntry.objects.get(journal_id=journalEntry_data['journal_id'])
        journalEntry_serializer = JournalEntrySerializer(journalEntrys, data = journalEntry_data)
        if journalEntry_serializer.is_valid():
            journalEntry_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        journalEntry = JournalEntry.objects.get(journal_id=pk)
        journalEntry.delete()
        return JsonResponse("Journal Entry was deleted Successfully", safe = False)
    

@csrf_exempt
def FoodEntryAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            foodEntry = FoodEntry.objects.all()
            serializer = FoodEntrySerializer(foodEntry, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                foodEntry = FoodEntry.objects.get(pk=pk)
                serializer = FoodEntrySerializer(foodEntry)
                return JsonResponse(serializer.data, safe=False)
            except JournalEntry.DoesNotExist:
                return JsonResponse({'error': 'Food Entry not found'}, status=404)
    elif request.method == 'POST':
        foodEntry_data = JSONParser().parse(request)
        foodEntry_serializer = FoodEntrySerializer(data = foodEntry_data)
        if foodEntry_serializer.is_valid():
            foodEntry_serializer.save()
            return JsonResponse("Food Entry Added Successfully", safe=False)
        return JsonResponse("Failed to Add Food Entry", safe=False)
    elif request.method == 'PUT':
        foodEntry_data = JSONParser().parse(request)
        foodEntrys = FoodEntry.objects.get(foodentry_id=foodEntry_data['foodentry_id'])
        foodEntry_serializer = FoodEntrySerializer(foodEntrys, data = foodEntry_data)
        if foodEntry_serializer.is_valid():
            foodEntry_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        foodEntry = FoodEntry.objects.get(foodentry_id=pk)
        foodEntry.delete()
        return JsonResponse("Food Entry was deleted Successfully", safe = False)
    

@csrf_exempt
def ScheduleDeckAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            scheduleDeck = ScheduleDeck.objects.all()
            serializer = ScheduleDeckSerializer(scheduleDeck, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                scheduleDeck = ScheduleDeck.objects.get(pk=pk)
                serializer = ScheduleDeckSerializer(scheduleDeck)
                return JsonResponse(serializer.data, safe=False)
            except ScheduleDeck.DoesNotExist:
                return JsonResponse({'error': 'Schedule Deck not found'}, status=404)
    elif request.method == 'POST':
        scheduleDeck_data = JSONParser().parse(request)
        scheduleDeck_serializer = ScheduleDeckSerializer(data = scheduleDeck_data)
        if scheduleDeck_serializer.is_valid():
            scheduleDeck_serializer.save()
            return JsonResponse("Schedule Deck Added Successfully", safe=False)
        return JsonResponse("Failed to Add Schedule Deck", safe=False)
    elif request.method == 'PUT':
        scheduleDeck_data = JSONParser().parse(request)
        scheduleDecks = ScheduleDeck.objects.get(scheduleDeck_id=scheduleDeck_data['schedule_id'])
        scheduleDeck_serializer = ScheduleDeckSerializer(scheduleDecks, data = scheduleDeck_data)
        if scheduleDeck_serializer.is_valid():
            scheduleDeck_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        scheduleDeck = ScheduleDeck.objects.get(schedule_id=pk)
        scheduleDeck.delete()
        return JsonResponse("Food Entry was deleted Successfully", safe = False)
    
@csrf_exempt
def VerifyNutritionistAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            verifyNutritionist = VerifyNutritionist.objects.all()
            serializer = VerifyNutritionistSerializer(verifyNutritionist, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                verifyNutritionist = VerifyNutritionist.objects.get(pk=pk)
                serializer = VerifyNutritionistSerializer(verifyNutritionist)
                return JsonResponse(serializer.data, safe=False)
            except VerifyNutritionist.DoesNotExist:
                return JsonResponse({'error': 'Verify Nutritionist not found'}, status=404)
    elif request.method == 'POST':
        verifyNutritionist_data = JSONParser().parse(request)
        verifyNutritionist_serializer = VerifyNutritionistSerializer(data = verifyNutritionist_data)
        if verifyNutritionist_serializer.is_valid():
            verifyNutritionist_serializer.save()
            return JsonResponse("Verify Nutritionist Added Successfully", safe=False)
        return JsonResponse("Failed to Add VerifyNutritionist", safe=False)
    elif request.method == 'PUT':
        verifyNutritionist_data = JSONParser().parse(request)
        verifyNutritionists = VerifyNutritionist.objects.get(verifyNutritionist_id=verifyNutritionist_data['verify_id'])
        verifyNutritionist_serializer = VerifyNutritionistSerializer(verifyNutritionists, data = verifyNutritionist_data)
        if verifyNutritionist_serializer.is_valid():
            verifyNutritionist_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        verifyNutritionist = VerifyNutritionist.objects.get(verify_id=pk)
        verifyNutritionist.delete()
        return JsonResponse("Verify Nutritionist was deleted Successfully", safe = False)
    

@csrf_exempt
def GeneratedMealAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            generatedMeal = GeneratedMeal.objects.all()
            serializer = GeneratedMealSerializer(generatedMeal, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                generatedMeal = GeneratedMeal.objects.get(pk=pk)
                serializer = GeneratedMealSerializer(generatedMeal)
                return JsonResponse(serializer.data, safe=False)
            except GeneratedMeal.DoesNotExist:
                return JsonResponse({'error': 'Generated Meal not found'}, status=404)
    elif request.method == 'POST':
        generatedMeal_data = JSONParser().parse(request)
        generatedMeal_serializer = GeneratedMealSerializer(data = generatedMeal_data)
        if generatedMeal_serializer.is_valid():
            generatedMeal_serializer.save()
            return JsonResponse("Generated Meal Added Successfully", safe=False)
        return JsonResponse("Failed to Add Generated Meal", safe=False)
    elif request.method == 'PUT':
        generatedMeal_data = JSONParser().parse(request)
        generatedMeals = VerifyNutritionist.objects.get(generatedMeal_id=generatedMeal_data['generatedMeal_id'])
        generatedMeal_serializer = GeneratedMealSerializer(generatedMeals, data = generatedMeal_data)
        if generatedMeal_serializer.is_valid():
            generatedMeal_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        generatedMeal = GeneratedMeal.objects.get(verify_id=pk)
        generatedMeal.delete()
        return JsonResponse("Generated Meal was deleted Successfully", safe = False)
    


@csrf_exempt
def RequestMealsAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            requestMeals = RequestMeals.objects.all()
            serializer = RequestMealsSerializer(requestMeals, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                requestMeals = RequestMeals.objects.get(pk=pk)
                serializer = RequestMealsSerializer(requestMeals)
                return JsonResponse(serializer.data, safe=False)
            except RequestMeals.DoesNotExist:
                return JsonResponse({'error': 'Requested Meals not found'}, status=404)
    elif request.method == 'POST':
        requestMeals_data = JSONParser().parse(request)
        requestMeals_serializer = RequestMealsSerializer(data = requestMeals_data)
        if requestMeals_serializer.is_valid():
            requestMeals_serializer.save()
            return JsonResponse("Requested Meals Added Successfully", safe=False)
        return JsonResponse("Failed to Add Request Meals", safe=False)
    elif request.method == 'PUT':
        requestMeals_data = JSONParser().parse(request)
        requestMealss = RequestMeals.objects.get(request_id=requestMeals_data['request_id'])
        requestMeals_serializer = RequestMealsSerializer(requestMealss, data = requestMeals_data)
        if requestMeals_serializer.is_valid():
            requestMeals_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        requestMeals = RequestMeals.objects.get(request_id=pk)
        requestMeals.delete()
        return JsonResponse("Requested Meals was deleted Successfully", safe = False)


@csrf_exempt
def ThemeAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            theme = Theme.objects.all()
            serializer = ThemeSerializer(theme, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                theme = Theme.objects.get(pk=pk)
                serializer = ThemeSerializer(theme)
                return JsonResponse(serializer.data, safe=False)
            except Theme.DoesNotExist:
                return JsonResponse({'error': 'Theme not found'}, status=404)
    elif request.method == 'POST':
        theme_data = JSONParser().parse(request)
        theme_serializer = ThemeSerializer(data = theme_data)
        if theme_serializer.is_valid():
            theme_serializer.save()
            return JsonResponse("Theme Added Successfully", safe=False)
        return JsonResponse("Failed to Add Theme", safe=False)
    elif request.method == 'PUT':
        theme_data = JSONParser().parse(request)
        themes = Theme.objects.get(request_id=theme_data['theme_id'])
        theme_serializer = RequestMealsSerializer(themes, data = theme_data)
        if theme_serializer.is_valid():
            theme_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        theme = Theme.objects.get(theme_id=pk)
        theme.delete()
        return JsonResponse("Theme was deleted Successfully", safe = False)
    

@csrf_exempt
def DeployedOrderAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            deployedOrder = DeployedOrder.objects.all()
            serializer = DeployedOrderSerializer(deployedOrder, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                deployedOrder = DeployedOrder.objects.get(pk=pk)
                serializer = DeployedOrderSerializer(deployedOrder)
                return JsonResponse(serializer.data, safe=False)
            except Theme.DoesNotExist:
                return JsonResponse({'error': 'DeployedOrder not found'}, status=404)
    elif request.method == 'POST':
        deployedOrder_data = JSONParser().parse(request)
        deployedOrder_serializer = DeployedOrderSerializer(data = deployedOrder_data)
        if deployedOrder_serializer.is_valid():
            deployedOrder_serializer.save()
            return JsonResponse("Deployed Order Added Successfully", safe=False)
        return JsonResponse("Failed to Add Deployed Order",safe=False)
    elif request.method == 'PUT':
        deployedOrder_data = JSONParser().parse(request)
        deployedOrders = DeployedOrder.objects.get(deployed_id=deployedOrder_data['deployed_id'])
        deployedOrder_serializer = DeployedOrderSerializer(deployedOrders, data = deployedOrder_data)
        if deployedOrder_serializer.is_valid():
            deployedOrder_serializer.save()
            return JsonResponse("Update Successfully",  safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        deployedOrder = DeployedOrder.objects.get(deployed_id=pk)
        deployedOrder.delete()
        return JsonResponse("Deployed Order was deleted Successfully", safe = False)
    

@csrf_exempt
def ProfilingAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            profiling = Profiling.objects.all()
            serializer = ProfilingSerializer(profiling, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                profiling = Profiling.objects.get(pk=pk)
                serializer = ProfilingSerializer(profiling)
                return JsonResponse(serializer.data, safe=False)
            except Theme.DoesNotExist:
                return JsonResponse({'error': 'Profiling not found'}, status=404)
    elif request.method == 'POST':
        profiling_data = JSONParser().parse(request)
        profiling_serializer = ProfilingSerializer(data = profiling_data)
        if profiling_serializer.is_valid():
            profiling_serializer.save()
            return JsonResponse("Profiling Added Successfully", safe=False)
        return JsonResponse("Failed to Add Profiling",safe=False)
    elif request.method == 'PUT':
        profiling_data = JSONParser().parse(request)
        profilings = Profiling.objects.get(profiling_id=profiling_data['profiling_id'])
        profiling_serializer = ProfilingSerializer(profilings, data = profiling_data)
        if profiling_serializer.is_valid():
            profiling_serializer.save()
            return JsonResponse("Update Profiling Successfully",  safe=False)
        return JsonResponse("Failed to Update Profiling", safe=False)
    elif request.method == 'DELETE':
        profiling = Profiling.objects.get(profiling_id=pk)
        profiling.delete()
        return JsonResponse("Profiling was deleted Successfully", safe = False)
    


@csrf_exempt
def PendingAppointmentAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            pendingAppointment = PendingAppointment.objects.all()
            serializer = PendingAppointmentSerializer(pendingAppointment, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                pendingAppointment = PendingAppointment.objects.get(pk=pk)
                serializer = PendingAppointmentSerializer(pendingAppointment)
                return JsonResponse(serializer.data, safe=False)
            except Theme.DoesNotExist:
                return JsonResponse({'error': 'Pending Appointment not found'}, status=404)
    elif request.method == 'POST':
        pendingAppointment_data = JSONParser().parse(request)
        pendingAppointment_serializer = PendingAppointmentSerializer(data = pendingAppointment_data)
        if pendingAppointment_serializer.is_valid():
            pendingAppointment_serializer.save()
            return JsonResponse("Pending Appointment Added Successfully", safe=False)
        return JsonResponse("Failed to Add Pending Appointment",safe=False)
    elif request.method == 'PUT':
        pendingAppointment_data = JSONParser().parse(request)
        pendingAppointments = PendingAppointment.objects.get(pending_id=pendingAppointment_data['pending_id'])
        pendingAppointment_serializer = PendingAppointmentSerializer(pendingAppointments, data = pendingAppointment_data)
        if pendingAppointment_serializer.is_valid():
            pendingAppointment_serializer.save()
            return JsonResponse("Update Pending Appointment Successfully",  safe=False)
        return JsonResponse("Failed to Update Pending Appointment", safe=False)
    elif request.method == 'DELETE':
        pendingAppointment = PendingAppointment.objects.get(pending_id=pk)
        pendingAppointment.delete()
        return JsonResponse("PendingAppointment was deleted Successfully", safe = False)
    


@csrf_exempt
def PatientNutritionistAgreementAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            patientNutritionistAgreement = PatientNutritionistAgreement.objects.all()
            serializer = PatientNutritionistAgreementSerializer(patientNutritionistAgreement, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                patientNutritionistAgreement = PatientNutritionistAgreement.objects.get(pk=pk)
                serializer = PatientNutritionistAgreementSerializer(patientNutritionistAgreement)
                return JsonResponse(serializer.data, safe=False)
            except Theme.DoesNotExist:
                return JsonResponse({'error': 'PatientNutritionistAgreement not found'}, status=404)
    elif request.method == 'POST':
        patientNutritionistAgreement_data = JSONParser().parse(request)
        patientNutritionistAgreement_serializer = PatientNutritionistAgreementSerializer(data = patientNutritionistAgreement_data)
        if patientNutritionistAgreement_serializer.is_valid():
            patientNutritionistAgreement_serializer.save()
            return JsonResponse("PatientNutritionistAgreement Added Successfully", safe=False)
        return JsonResponse("Failed to PatientNutritionistAgreement",safe=False)
    elif request.method == 'PUT':
        patientNutritionistAgreement_data = JSONParser().parse(request)
        patientNutritionistAgreements = PatientNutritionistAgreement.objects.get(agree_id=patientNutritionistAgreement_data['agree_id'])
        patientNutritionistAgreement_serializer = PatientNutritionistAgreementSerializer(patientNutritionistAgreements, data = patientNutritionistAgreement_data)
        if patientNutritionistAgreement_serializer.is_valid():
            patientNutritionistAgreement_serializer.save()
            return JsonResponse("Update PatientNutritionistAgreement Successfully",  safe=False)
        return JsonResponse("Failed to Update PatientNutritionistAgreement", safe=False)
    elif request.method == 'DELETE':
        patientNutritionistAgreement = PatientNutritionistAgreement.objects.get(agree_id=pk)
        PatientNutritionistAgreement.delete()
        return JsonResponse("PatientNutritionistAgreement was deleted Successfully", safe = False)
  

@csrf_exempt
def RecommendMealPlanAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            recommendMealPlan = RecommendMealPlan.objects.all()
            serializer = RecommendMealPlanSerializer(recommendMealPlan, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                recommendMealPlan = RecommendMealPlan.objects.get(pk=pk)
                serializer = RecommendMealPlanSerializer(recommendMealPlan)
                return JsonResponse(serializer.data, safe=False)
            except Theme.DoesNotExist:
                return JsonResponse({'error': 'RecommendMealPlan not found'}, status=404)
    elif request.method == 'POST':
        recommendMealPlan_data = JSONParser().parse(request)
        recommendMealPlan_serializer = RecommendMealPlanSerializer(data = recommendMealPlan_data)
        if recommendMealPlan_serializer.is_valid():
            recommendMealPlan = recommendMealPlan_serializer.save()
            recommendMealPlan_serializer.save()
            response_data = {"id": recommendMealPlan.pk, "message": "Recommend Meal Plan Added Successfully"}
            return JsonResponse(response_data , safe=False)
        return JsonResponse("Failed to Recommend Meal Plan",safe=False)
    elif request.method == 'PUT':
        recommendMealPlan_data = JSONParser().parse(request)
        recommendMealPlans = RecommendMealPlan.objects.get(recommend_mealplan_id_id=recommendMealPlan_data['recommend_mealplan_id'])
        recommendMealPlan_serializer = RecommendMealPlanSerializer(recommendMealPlans, data = recommendMealPlan_data)
        if recommendMealPlan_serializer.is_valid():
            recommendMealPlan_serializer.save()
            return JsonResponse("Update Recommend Meal Plan Successfully",  safe=False)
        return JsonResponse("Failed to Update Recommend Meal Plan", safe=False)
    elif request.method == 'DELETE':
        recommendMealPlan = RecommendMealPlan.objects.get(recommend_mealplan_id=pk)
        RecommendMealPlan.delete()
        return JsonResponse("Recommend Meal Plan was deleted Successfully", safe = False)
    

@csrf_exempt
def RecommendMealAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            recommendMeal = RecommendMeal.objects.all()
            serializer = RecommendMealSerializer(recommendMeal, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                recommendMeal = RecommendMealPlan.objects.get(pk=pk)
                serializer = RecommendMealPlanSerializer(recommendMeal)
                return JsonResponse(serializer.data, safe=False)
            except Theme.DoesNotExist:
                return JsonResponse({'error': 'Recommend Meal not found'}, status=404)
    elif request.method == 'POST':
        recommendMeal_data = JSONParser().parse(request)
        recommendMeal_serializer = RecommendMealSerializer(data = recommendMeal_data)
        if recommendMeal_serializer.is_valid():
            recommendMeal_serializer.save()
            return JsonResponse("Recommend Meal Added Successfully", safe=False)
        return JsonResponse("Failed to Recommend Meal",safe=False)
    elif request.method == 'PUT':
        recommendMeal_data = JSONParser().parse(request)
        recommendMeals = RecommendMeal.objects.get(recommend_meal_id=recommendMeal_data['recommend_meal_id'])
        recommendMealPlan_serializer = RecommendMealPlanSerializer(recommendMeals, data = recommendMeal_data)
        if recommendMeal_serializer.is_valid():
            recommendMeal_serializer.save()
            return JsonResponse("Update Recommend Meal Successfully",  safe=False)
        return JsonResponse("Failed to Update Recommend Meal", safe=False)
    elif request.method == 'DELETE':
        recommendMealPlan = RecommendMeal.objects.get(recommend_meal_id=pk)
        RecommendMealPlan.delete()
        return JsonResponse("Recommend Meal was deleted Successfully", safe = False)
    


@csrf_exempt
def RequestRecommendMealsAPI(request, pk=0):
    if request.method == 'GET':
        if pk == 0:  # Check if pk is not specified (meaning get all users)
            requestRecommendMeals = RequestRecommendMeals.objects.all()
            serializer = RequestRecommendMealsSerializer(requestRecommendMeals, many=True)  # Set many=True for multiple users
            return JsonResponse(serializer.data, safe=False)
        else:
            # Existing logic for fetching a single user using pk
            try:
                requestRecommendMeals = RequestRecommendMeals.objects.get(pk=pk)
                serializer = RequestRecommendMealsSerializer(requestRecommendMeals)
                return JsonResponse(serializer.data, safe=False)
            except RequestRecommendMeals.DoesNotExist:
                return JsonResponse({'error': 'Requested Recommend Meals not found'}, status=404)
    elif request.method == 'POST':
        requestRecommendMeals_data = JSONParser().parse(request)
        requestRecommendMeals_serializer = RequestRecommendMealsSerializer(data = requestRecommendMeals_data)
        if requestRecommendMeals_serializer.is_valid():
            requestRecommendMeals_serializer.save()
            return JsonResponse("Requested Recommend Meals Added Successfully", safe=False)
        return JsonResponse("Failed to Add Request Recommend Meals", safe=False)
    elif request.method == 'PUT':
        requestRecommendMeals_data = JSONParser().parse(request)
        requestRecommendMealss = RequestRecommendMeals.objects.get(request_id=requestRecommendMeals_data['request_id'])
        requestRecommendMeals_serializer = RequestRecommendMealsSerializer(requestRecommendMealss, data = requestRecommendMeals_data)
        if requestRecommendMeals_serializer.is_valid():
            requestRecommendMeals_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        requestRecommendMeals = RequestRecommendMeals.objects.get(request_id=pk)
        requestRecommendMeals.delete()
        return JsonResponse("Requested Recommend Meals was deleted Successfully", safe = False)
