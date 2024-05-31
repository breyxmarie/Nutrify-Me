from django.contrib import admin
from .models import *


admin.site.register(Project)
admin.site.register(User)
admin.site.register(Nutritionist)
#admin.site.register(VideoCalls)
admin.site.register(Meeting)
admin.site.register(ShopMealPlan)
admin.site.register(ShopMeal)
admin.site.register(Cart)

# Register your models here.
