def generate_swimming_workout_plan(sex, height_inches, weight_pounds, age):
    """
    Generates a swimming workout plan based on user's sex, height, weight, and age.

    Parameters:
    - sex (str): 'M' for male or 'F' for female.
    - height_inches (float): Height in inches.
    - weight_pounds (float): Weight in pounds.
    - age (int): Age in years.

    Returns:
    - list: A list of workout activities (strings).
    """
    # Calculate Body Mass Index (BMI)
    height_meters = height_inches * 0.0254  # Convert height to meters
    weight_kg = weight_pounds * 0.453592  # Convert weight to kilograms
    bmi = weight_kg / (height_meters ** 2)

    # Determine workout intensity based on BMI and age
    if bmi < 18.5:
        intensity = "Light"
    elif bmi >= 18.5 and bmi < 25:
        intensity = "Moderate"
    else:
        intensity = "High"

    if age < 18:
        intensity = "Light"  # Adjust for younger individuals

    # Generate workout plan based on sex and intensity
    if sex == 'M':
        if intensity == "Light":
            workout_plan = [
                "Warm up: 200 meters freestyle",
                "Kick drills: 4 x 50 meters with kickboard",
                "Cool down: 100 meters easy",
            ]
        elif intensity == "Moderate":
            workout_plan = [
                "Warm up: 400 meters freestyle",
                "Drills: 4 x 100 meters (mix of freestyle and backstroke)",
                "Main set: 6 x 200 meters (mix of strokes)",
                "Cool down: 200 meters easy",
            ]
        else:
            workout_plan = [
                "Warm up: 600 meters freestyle",
                "Drills and sprints: 8 x 100 meters (mix of strokes)",
                "Main set: 10 x 200 meters (varied intensity)",
                "Cool down: 400 meters easy",
            ]
    elif sex == 'F':
        if intensity == "Light":
            workout_plan = [
                "Warm up: 200 meters freestyle",
                "Kick drills: 4 x 50 meters with kickboard",
                "Cool down: 100 meters easy",
            ]
        elif intensity == "Moderate":
            workout_plan = [
                "Warm up: 400 meters freestyle",
                "Drills: 4 x 100 meters (mix of freestyle and backstroke)",
                "Main set: 6 x 200 meters (mix of strokes)",
                "Cool down: 200 meters easy",
            ]
        else:
            workout_plan = [
                "Warm up: 600 meters freestyle",
                "Drills and sprints: 8 x 100 meters (mix of strokes)",
                "Main set: 10 x 200 meters (varied intensity)",
                "Cool down: 400 meters easy",
            ]
    else:
        return "Invalid sex input. Please use 'M' for male or 'F' for female."

    return workout_plan

# Example usage:
sex = 'M'  # 'M' for male, 'F' for female
height_inches = 70  # Height in inches
weight_pounds = 160  # Weight in pounds
age = 30  # Age in years

workout = generate_swimming_workout_plan(sex, height_inches, weight_pounds, age)
for activity in workout:
    print(activity)
