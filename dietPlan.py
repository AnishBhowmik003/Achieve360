def generateDietPlan(goal, weight, height, age, sex):
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

import sys
goal = sys.argv[1]
#generateDietPlan(goal, 0, 0, 0, 0)
print(generateDietPlan(goal, 0, 0, 0, 0))
sys.stdout.flush()
