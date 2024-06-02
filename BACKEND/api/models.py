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

     def __str__(self):
        return self.name
     
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    password= models.CharField(max_length=50)
    first_name= models.CharField(max_length=50)
    last_name= models.CharField(max_length=50)
    privilege= models.CharField(max_length=30)
   # profile_pic = models.ImageField(upload_to=upload_to, blank=True, null=True)

    class Meta:
        db_table = "User"


   #  def __str__(self):
   #      return self.name

class Nutritionist(models.Model):
    nutritionist_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    password= models.CharField(max_length=50)
    first_name= models.CharField(max_length=50)
    last_name= models.CharField(max_length=50)
    license_id = models.CharField(max_length=50)
    schedule_day = models.CharField(max_length=300)
    schedule_time = models.CharField(max_length=300)

    class Meta:
        db_table = "Nutritionist"

# //! profile_pic = models.ImageField(upload_to=upload_to, blank=True, null=True)
    # //! (add picture for license) license_pic = models.ImageField(upload_to=upload_to, blank=True, null=True) 
    

class Appointment(models.Model):
    appointment_id = models.AutoField(primary_key=True)
    date = models.DateField()
    time = models.TimeField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listings")
    nutritionist_id = models.ForeignKey(Nutritionist, on_delete=models.CASCADE, related_name="listings") 

    class Meta:
        db_table = "Appointment"

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
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=300)
    # image = models.ImageField(blank=True, null=True, upload_to='Photos/meal_plan')
    description= models.CharField(max_length=200)
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
    food = models.CharField(max_length=70)
    image = models.CharField(max_length=100)
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

    class Meta:
        db_table = "address"