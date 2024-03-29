// https://youtu.be/brFHyOtTwH4?si=AWu8zCYM2Ha88ZhM
import React from 'react';
const Info = ({ onNavigate, type }) => {
    const running = ['https://youtu.be/brFHyOtTwH4?si=AWu8zCYM2Ha88ZhM', 'Proper running form is essential for efficiency, injury prevention, and overall enjoyment of the sport. Begin by standing tall with a slight forward lean from the ankles, engaging your core muscles for stability. Relax your shoulders and arms, letting them swing naturally at your sides. Your arms should be bent at approximately 90 degrees, with your hands loosely cupped. As you start to run, focus on landing softly on your midfoot, avoiding excessive heel striking or overstriding. Keep your strides short and quick, maintaining a cadence of around 170-180 steps per minute. Engage your glutes and core to propel yourself forward, and imagine a straight line extending from your head to your heels to ensure proper alignment. Finally, remember to breathe rhythmically and stay relaxed throughout your run. With practice and attention to form, you\'ll soon find your stride and enjoy the many benefits of running.'];
    const bench = ['https://youtu.be/4Y2ZdHCOXok?si=fY6oHynBBRUas4dn', 'Proper bench press technique is crucial for maximizing strength gains and preventing injury. Begin by lying flat on the bench with your feet firmly planted on the ground and your back, shoulders, and buttocks in contact with the bench. Grip the barbell with your hands slightly wider than shoulder-width apart, ensuring a firm and secure grip. Before lifting the barbell off the rack, engage your core muscles and maintain a slight arch in your lower back. Lower the barbell under control towards your mid-chest, keeping your elbows at a 45-degree angle to your body and your wrists straight. Avoid bouncing the bar off your chest and maintain tension in your chest muscles throughout the movement. Once the barbell lightly touches your chest, press it back up explosively to the starting position, fully extending your arms without locking out your elbows. Remember to breathe steadily throughout the lift, exhaling as you push the barbell up. With consistent practice and attention to form, you\'ll build strength and muscle mass effectively with the bench press.'];
    const squat = ['https://youtu.be/ubdIGnX2Hfs?si=ZazCHAn68W1fcs_f', 'Proper squat form is essential for building lower body strength and avoiding injury. Begin by standing with your feet shoulder-width apart or slightly wider, toes pointing slightly outward. Keep your chest up, shoulders back, and core engaged for stability. As you initiate the movement, hinge at your hips and bend your knees, lowering your body down as if you\'re sitting back into a chair. Keep your weight on your heels and midfoot, ensuring that your knees track in line with your toes and do not collapse inward. Aim to lower your hips until your thighs are at least parallel to the ground, maintaining a neutral spine throughout the movement. Avoid rounding your back or leaning too far forward. Drive through your heels to push yourself back up to the starting position, fully extending your hips and knees. Exhale as you ascend. Remember to control the movement both on the way down and on the way up, and never sacrifice form for the sake of lifting heavier weights. With practice and focus on proper technique, squats can become a highly effective exercise for building strength and muscle in your lower body.'];
    var info;
    if(type == 'running') info = running;
    if(type == 'bench press') info = bench;
    if(type == 'squatting') info = squat;
    return (
        <div>
        <a href={info[0]}>View a video about {type} form</a>
        <p>
            {info[1]}
        </p>
        <button onClick={() => onNavigate('videos')}>Choose another exercise</button>
        <button onClick={() => onNavigate('dashboard')}>Back to Dashboard</button>
        </div>
    )
}
export default Info;
