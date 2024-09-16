from django.db import models
from django.db.models.fields.json import JSONField


# Create your models here.
class Project(models.Model):
     name = models.CharField(unique=True, max_length=100)
     start_date = models.DateField()
     end_date = models.DateField()
     comments =models.CharField(max_length=500, blank=True, null=True)
     status = models.CharField(max_length=100)
     created = models.DateField(auto_now_add=True)
     modified = models.DateField(auto_now=True)
     image = models.CharField(max_length=300)

     def __str__(self):
        return self.name
     
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    password= models.CharField(max_length=50)
    first_name= models.CharField(max_length=50)
    last_name= models.CharField(max_length=50)
    privilege= models.CharField(max_length=30)
    email=models.CharField(max_length=100)
    image = models.CharField(max_length=300)
    active = models.BooleanField()
   # profile_pic = models.ImageField(upload_to=upload_to, blank=True, null=True)

    class Meta:
        db_table = "user"


   #  def __str__(self):
   #      return self.name

class Nutritionist(models.Model):
    nutritionist_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    password= models.CharField(max_length=50)
    first_name= models.CharField(max_length=50)
    last_name= models.CharField(max_length=50)
    license_id = models.CharField(max_length=50)
    schedule_day = JSONField()
    schedule_time = JSONField()
    image = models.CharField(max_length=150)
    license_pic = models.CharField(max_length=200)
    user_id =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="listings5")

    class Meta:
        db_table = "nutritionist"

# //! profile_pic = models.ImageField(upload_to=upload_to, blank=True, null=True)
    # //! (add picture for license) license_pic = models.ImageField(upload_to=upload_to, blank=True, null=True) 
    

class Appointment(models.Model):
    appointment_id = models.AutoField(primary_key=True)
    date = models.DateField()
    time = models.TimeField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listings")
    nutritionist_id = models.ForeignKey(Nutritionist, on_delete=models.CASCADE, related_name="listings") 
    kind = models.CharField(max_length=150)
    class Meta:
        db_table = "appointment"

# class VideoCall(models.Model):
#     video_id = models.AutoField(primary_key=True)
#     meeting_id = models.CharField(max_length=100)

#     class Meta:
#         db_table = "VideoCall"

class Meeting(models.Model):
     video_id = models.AutoField(primary_key=True)
     meeting_id = models.CharField(max_length=100)

     class Meta:
         db_table = "meeting"

def upload_meal_path(instance, filename):
    return '/'.join(['meal_plan', str(instance.title), filename])


class ShopMealPlan(models.Model):
    shop_mealplan_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=1000)
    image = models.CharField(max_length=3000)
    # image = models.ImageField(blank=True, null=True, upload_to='Photos/meal_plan')
    description= models.CharField(max_length=2000)
    start_week = models.DateField(auto_now=False)
    end_week = models.DateField(auto_now=False)
    price = models.IntegerField()

    class Meta:
        db_table = "shop_meal_plan"

class ShopMeal(models.Model):
    shop_meal_id = models.AutoField(primary_key=True)
    mealplan_id = models.ForeignKey(ShopMealPlan, on_delete=models.CASCADE, related_name="listings")
    type = models.CharField(max_length=30)
    calories = models.IntegerField() 
    fat= models.IntegerField()
    protein= models.IntegerField()
    carbs = models.IntegerField()
    food = models.CharField(max_length=1000)
    image = models.CharField(max_length=3000)
    day = models.CharField(max_length=15)
    
    class Meta:
        db_table = "shop_meal"
class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listingss")
    orders = JSONField()

    class Meta:
        db_table = "cart"

class Address(models.Model):
    address_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listingsss")
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=500)
    name = models.CharField(max_length=100)
    default = models.BooleanField(default=0)
    postalcode = models.CharField(max_length=15)
    longi = models.FloatField() 
    lang = models.FloatField() 

    class Meta:
        db_table = "address"

class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listingsss1")
    orders= JSONField()
    date = models.DateField()
    status = models.CharField(max_length=35)
    address_id  = models.ForeignKey(Address, on_delete=models.CASCADE, related_name="listingsss1")
    payment  = models.CharField(max_length=35)
    shipping  = models.CharField(max_length=35)
    notes = models.CharField(max_length=(400))
    totalprice = models.IntegerField()
    shipping_price = models.IntegerField()
    payment_details = JSONField()
    schedule_date = JSONField()

    class Meta:
        db_table = "orders"

class JournalEntry(models.Model):
    journal_id = models.AutoField(primary_key=True)
    date = models.DateField()
    title = models.CharField(max_length=100)
    entry = models.CharField(max_length=500)
    systolic = models.IntegerField()
    diastolic  = models.IntegerField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listingsss4")
    meal_plan = models.CharField(max_length=500)

    class Meta:
        db_table = "journal_entry"

class FoodEntry(models.Model):
    foodentry_id = models.AutoField(primary_key=True)
    journal_id = models.ForeignKey(JournalEntry, on_delete=models.CASCADE, related_name="listingsss2")
    type = models.CharField(max_length=25)
    food = models.CharField(max_length=100)
    calories = models.IntegerField()
    fat = models.IntegerField()
    protein = models.IntegerField()
    carbs= models.IntegerField() 

    class Meta:
        db_table = "food_entry"


class ScheduleDeck(models.Model):
    schedule_id = models.AutoField(primary_key=True)
    nutritionist_id = models.ForeignKey(Nutritionist, on_delete=models.CASCADE, related_name="listingsss3")
    time = models.TimeField()
    date = models.DateField()
    type = models.CharField(max_length=20)

    class Meta:
        db_table = "schedule_deck"

class VerifyNutritionist(models.Model):
    verify_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    license_pic = models.CharField(max_length=300)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    license_id = models.CharField(max_length=20)

    class Meta:
        db_table = "verify_nutritionist"

class GeneratedMeal(models.Model):
    generatedMeal_id =models.AutoField(primary_key=True)
    date = models.DateField()
    meal = JSONField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listingsss10")
    name = models.CharField(max_length=40)
    age = models.IntegerField()
    gender = models.CharField(max_length=40)
    activity = models.CharField(max_length=40)
    goal = models.CharField(max_length=40)
    cuisine = JSONField()
    diet = models.CharField(max_length=40)
    allergen = models.CharField(max_length=50)
    height = models.IntegerField()
    weight = models.IntegerField()

    class Meta:
        db_table = "generated_meal"

class RequestMeals(models.Model):
    request_id =models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listingsss100")
    generatedMeal_id =  models.ForeignKey(GeneratedMeal, on_delete=models.CASCADE, related_name="listingsss100")
    date = models.DateField()
    status = models.CharField(max_length=200)
    price = models.IntegerField()

    class Meta:
        db_table = "request_meals"

class Theme(models.Model):
    theme_id = models.AutoField(primary_key=True)
    primaryColor = models.CharField(max_length=50)
    secondaryColor = models.CharField(max_length=50)
    logo = models.CharField(max_length=200)

    class Meta:
        db_table = "theme"

class DeployedOrder(models.Model):
    deployed_id = models.AutoField(primary_key=True)
    user =  JSONField()
    order =  JSONField()
    address = JSONField()
    order_details = JSONField()
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=50) 
    class Meta:
        db_table = "deployed_order"

class Profiling(models.Model):
    profiling_id = models.AutoField(primary_key=True)
    user_id =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="listings67")
    age = models.IntegerField()
    gender = models.CharField(max_length=100)
    targetCalories = models.IntegerField()
    common_sys = models.IntegerField()
    common_dia = models.IntegerField()
    hypertension = models.BooleanField(default=0)
    dateofBP = models.DateField()
    takingMeds = models.BooleanField(default=0)
    targetCalories = models.IntegerField()

    class Meta:
        db_table = "profiling"

class PendingAppointment(models.Model):
    pending_id = models.AutoField(primary_key=True)
    date = models.DateField()
    user_id =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="listings8")
    nutritionist_id =  models.ForeignKey(Nutritionist, on_delete=models.CASCADE, related_name="listings8")
    status = models.CharField(max_length=100)
    kind = models.CharField(max_length=100)
    time = models.TimeField()

    class Meta:
        db_table = "pending_appointment"

class PatientNutritionistAgreement(models.Model):
    agree_id = models.AutoField(primary_key=True)
    status = models.CharField(max_length=100)
    user_id =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="listings15")
    nutritionist_id =  models.ForeignKey(Nutritionist, on_delete=models.CASCADE, related_name="listings15")
    class Meta:
        db_table = "patient_nutritionist_agreement"


class RecommendMealPlan(models.Model):
    recommend_mealplan_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=1000)
    image = models.CharField(max_length=3000)
    # image = models.ImageField(blank=True, null=True, upload_to='Photos/meal_plan')
    description= models.CharField(max_length=2000)
    nutritionist_id = models.ForeignKey(Nutritionist, on_delete=models.CASCADE, related_name="listingsss123")
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listingsss123")
    
    class Meta:
        db_table = "recommend_meal_plan"


class RecommendMeal(models.Model):
    recommend_meal_id = models.AutoField(primary_key=True)
    recommend_mealplan_id  = models.ForeignKey(RecommendMealPlan, on_delete=models.CASCADE, related_name="listings56")
    type = models.CharField(max_length=30)
    calories = models.IntegerField() 
    fat= models.IntegerField()
    protein= models.IntegerField()
    carbs = models.IntegerField()
    food = models.CharField(max_length=1000)
    image = models.CharField(max_length=3000)
    day = models.CharField(max_length=15)
    class Meta:
        db_table = "recommend_meal"

