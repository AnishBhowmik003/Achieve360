def calculateMetabolicRate(weight, height, age, sex):
    if sex == "male":
        bmr = 66 + (6.3 * weight) + (12.9 * height) - (6.8 * age)
    else:
        bmr = 655 + (4.3 * weight) + (4.7 * height) - (4.7 * age)
    return bmr

def calculateMaintenanceCalories(bmr, activity_level):
    activity_levels = {
        "none": 1.2,
        "lightly active": 1.375,
        "moderately active": 1.55,
        "very active": 1.725,
        "extra active": 1.9
    }
    return bmr * activity_levels.get(activity_level.lower(), 1.725)

def calculateWeightLossCalories(bmr, activity_level):
    return calculateMaintenanceCalories(bmr, activity_level) - 500

def calculateWeightGainCalories(bmr, activity_level):
    return calculateMaintenanceCalories(bmr, activity_level) + 500


def generateDietPlan(goal):
    weight_gain_foods = {
        "Protein Sources": ["Chicken breast", "Salmon", "Tofu", "Greek yogurt"],
        "Carbohydrate Sources": ["Brown rice", "Sweet potatoes", "Quinoa", "Whole wheat bread"],
        "Healthy Fats": ["Avocado", "Nuts", "Olive oil", "Flaxseeds"],
        "Fruits": ["Bananas", "Berries", "Oranges", "Apples"],
        "Vegetables": ["Broccoli", "Spinach", "Bell peppers", "Carrots"]
    }

    weight_loss_foods = {
        "Lean Protein Sources": ["Turkey breast", "White fish", "Egg whites", "Cottage cheese"],
        "Non-Starchy Vegetables": ["Kale", "Cauliflower", "Zucchini", "Asparagus"],
        "Complex Carbohydrates": ["Quinoa", "Oats", "Barley", "Brown rice"],
        "Healthy Fats": ["Almonds", "Walnuts", "Chia seeds", "Coconut oil"],
        "Fruits": ["Grapefruit", "Watermelon", "Berries", "Pears"]
    }

    if goal.lower() == "gain":
        diet_plan = weight_gain_foods
    elif goal.lower() == "loss":
        diet_plan = weight_loss_foods
    elif goal.lower() == "maintain":
        diet_plan = weight_gain_foods
    else:
        return "Invalid goal. Please choose 'gain' or 'loss'."

    return diet_plan

def createTotalPlan(weightGoal, weight, height, age, sex, activity_level):
    output = str(generateDietPlan(weightGoal))
    bmr = calculateMetabolicRate(weight, height, age, sex)
    if weightGoal == "maintain":
        goalCalories = calculateMaintenanceCalories(bmr, activity_level)
    elif weightGoal == "gain":
        goalCalories = calculateWeightGainCalories(bmr, activity_level)
    elif weightGoal == "loss":
        goalCalories = calculateWeightLossCalories(bmr, activity_level)

    pounds = weight * 2.205
    proteinMin = 0.5 * pounds

    output += "\n\nGoal Calories:" + str(goalCalories) + "\n\nEat " + str(proteinMin) + " to " + str(pounds) + " grams of protein a day"

    return(output)
    

import sys
#calc weight in kg
#calc height in cm
weightGoal = sys.argv[1] #options are gain, loss, maintain
weight = float(sys.argv[2]) / 2.205
height = float(sys.argv[3]) * 2.54
age = float(sys.argv[4])
sex = sys.argv[5]
activity_level = sys.argv[6] #options are none, lightly active, moderatly active, very active, extra active
print(createTotalPlan(weightGoal, weight, height, age, sex, activity_level))
sys.stdout.flush()