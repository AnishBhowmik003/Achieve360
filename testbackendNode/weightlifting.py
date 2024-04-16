import sys

def round_nearest_5(num):
    return round(num / 5) * 5

def generate_workout_plan(military_press, deadlift, benchpress, squat):
    weeks = 4
    multipliers = [
        [0.4, 0.5, 0.6, 0.65, 0.75, 0.85],
        [0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
        [0.4, 0.5, 0.6, 0.75, 0.85, 0.95],
        [0.4, 0.5, 0.6]  # Deload week
    ]
    reps = [
        ["5", "5", "3", "5", "5", "5+"],
        ["5", "5", "3", "3", "3", "3+"],
        ["5", "5", "3", "5", "3", "1+"],
        ["5", "5", "5"]  # Deload week
    ]

    plan_output = ""

    for week in range(weeks):
        plan_output += f"Week {week + 1}:\n"
        for i in range(len(multipliers[week])):
            mp_weight = round_nearest_5(military_press * multipliers[week][i] * 0.9)
            dl_weight = round_nearest_5(deadlift * multipliers[week][i] * 0.9)
            bp_weight = round_nearest_5(benchpress * multipliers[week][i] * 0.9)
            squat_weight = round_nearest_5(squat * multipliers[week][i] * 0.9)
            plan_output += f"  Military Press: {mp_weight} lbs x {reps[week][i]}\n"
            plan_output += f"  Deadlift: {dl_weight} lbs x {reps[week][i]}\n"
            plan_output += f"  Benchpress: {bp_weight} lbs x {reps[week][i]}\n"
            plan_output += f"  Squat: {squat_weight} lbs x {reps[week][i]}\n"
        plan_output += "\n"

    return plan_output

# Example usage:
#military press, deadlift, benchpress, squat

if __name__ == "__main__":
    military_press = int(sys.argv[1])
    deadlift = int(sys.argv[2])
    benchpress = int(sys.argv[3])
    squat = int(sys.argv[4])
    print(generate_workout_plan(military_press, deadlift, benchpress, squat))
