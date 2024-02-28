def calculateMetabolicRate(weight, height, age, sex):
    if sex == "male":
        bmr = 66 + (6.3 * weight) + (12.9 * height) - (6.8 * age)
    else:
        bmr = 655 + (4.3 * weight) + (4.7 * height) - (4.7 * age)
    return bmr

def calculateMaintenanceCalories(bmr, activity_level):
    if activity_level == "none":
        calories = bmr * 1.2
    elif activity_level == "lightly active":
        calories = bmr * 1.375
    elif activity_level == "moderately active":
        calories = bmr * 1.55
    elif activity_level == "very active":
        calories = bmr * 1.725
    elif activity_level == "extra active":
        calories = bmr * 1.9
    else:
        calories = bmr * 1.725
    return calories

def calculateWeightLossCalories(bmr, activity_level):
    return calculateMaintenanceCalories(bmr, activity_level) - 500

def calculateWeightGainCalories(bmr, activity_level):
    return calculateMaintenanceCalories(bmr, activity_level) + 500