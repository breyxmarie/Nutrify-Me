from django.db import models

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