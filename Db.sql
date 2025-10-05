CREATE DATABASE jsQuizPro;
use jsQuizPro;

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user' NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    totalScore INT DEFAULT 0
);

CREATE TABLE Quiz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE Question (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    text TEXT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES Quiz(id) ON DELETE CASCADE
);

CREATE TABLE Answer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    question_id INT NOT NULL,
    status BOOLEAN NOT NULL, -- 1 = correct, 0 = incorrect
    FOREIGN KEY (question_id) REFERENCES Question(id) ON DELETE CASCADE
);

CREATE TABLE Rapport (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    score INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES Quiz(id) ON DELETE CASCADE
);

CREATE TABLE History (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    response_id INT NOT NULL,
    rapport_id INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES Question(id) ON DELETE CASCADE,
    FOREIGN KEY (response_id) REFERENCES Answer(id) ON DELETE CASCADE,
    FOREIGN KEY (rapport_id) REFERENCES Rapport(id) ON DELETE CASCADE
);
INSERT INTO user (NAME, ROLE, email, PASSWORD, totalScore)
VALUES ("admin", "admin", "admin@gmail.com", "admin@gmail.com", 0);

-- Insert Quiz (general)
INSERT INTO Quiz (category, user_id) 
VALUES ('general', 1);

-- Get the quiz_id (assume AUTO_INCREMENT gives 1 for first quiz)
SET @quiz_id = LAST_INSERT_ID();

-- Insert Questions & Answers
-- Q1
INSERT INTO Question (quiz_id, text) VALUES (@quiz_id, 'What is the capital of France?');
SET @q1 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Paris', @q1, TRUE),
('Lyon', @q1, FALSE),
('Marseille', @q1, FALSE);

-- Q2
INSERT INTO Question (quiz_id, text) VALUES (@quiz_id, 'Which ocean is the largest?');
SET @q2 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Pacific', @q2, TRUE),
('Atlantic', @q2, FALSE),
('Indian', @q2, FALSE);

-- Q3
INSERT INTO Question (quiz_id, text) VALUES (@quiz_id, 'How many days are there in a leap year?');
SET @q3 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('365', @q3, TRUE),
('366', @q3, TRUE),
('364', @q3, FALSE);

-- Q4
INSERT INTO Question (quiz_id, text) VALUES (@quiz_id, 'Which language has the most native speakers?');
SET @q4 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('English', @q4, FALSE),
('Mandarin Chinese', @q4, TRUE),
('Spanish', @q4, FALSE);

-- Q5
INSERT INTO Question (quiz_id, text) VALUES (@quiz_id, 'What currency is used in Japan?');
SET @q5 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Yen', @q5, TRUE),
('Won', @q5, FALSE),
('Yuan', @q5, FALSE);

-- Q6
INSERT INTO Question (quiz_id, text) VALUES (@quiz_id, 'Which continent is Egypt in?');
SET @q6 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Asia', @q6, FALSE),
('Africa', @q6, TRUE),
('Europe', @q6, FALSE);

-- Q7
INSERT INTO Question (quiz_id, text) VALUES (@quiz_id, 'What is H2O commonly known as?');
SET @q7 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Salt', @q7, FALSE),
('Water', @q7, TRUE),
('Hydrogen', @q7, FALSE);

-- Q8
INSERT INTO Question (quiz_id, text) VALUES (@quiz_id, 'Which planet is known as the Red Planet?');
SET @q8 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Mars', @q8, TRUE),
('Jupiter', @q8, FALSE),
('Venus', @q8, FALSE);

-- Q9
INSERT INTO Question (quiz_id, text) VALUES (@quiz_id, 'Which of the following are European countries?');
SET @q9 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('France', @q9, TRUE),
('Brazil', @q9, FALSE),
('Germany', @q9, TRUE);

-- Q10
INSERT INTO Question (quiz_id, text) VALUES (@quiz_id, 'Which instrument has keys, pedals, and strings?');
SET @q10 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Piano', @q10, TRUE),
('Violin', @q10, FALSE),
('Flute', @q10, FALSE);

-- Insert Quiz (history)
INSERT INTO Quiz (category, user_id) 
VALUES ('history', 1);

-- Get quiz_id
SET @quiz_history = LAST_INSERT_ID();

-- Q1
INSERT INTO Question (quiz_id, text) VALUES (@quiz_history, 'Who was the first President of the United States?');
SET @hq1 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('George Washington', @hq1, TRUE),
('Abraham Lincoln', @hq1, FALSE),
('Thomas Jefferson', @hq1, FALSE);

-- Q2
INSERT INTO Question (quiz_id, text) VALUES (@quiz_history, 'In which year did World War II end?');
SET @hq2 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('1945', @hq2, TRUE),
('1944', @hq2, FALSE),
('1939', @hq2, FALSE);

-- Q3
INSERT INTO Question (quiz_id, text) VALUES (@quiz_history, 'Which ancient civilization built the pyramids at Giza?');
SET @hq3 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Romans', @hq3, FALSE),
('Egyptians', @hq3, TRUE),
('Mayans', @hq3, FALSE);

-- Q4
INSERT INTO Question (quiz_id, text) VALUES (@quiz_history, 'Who wrote the Declaration of Independence?');
SET @hq4 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Benjamin Franklin', @hq4, FALSE),
('Thomas Jefferson', @hq4, TRUE),
('James Madison', @hq4, FALSE);

-- Q5
INSERT INTO Question (quiz_id, text) VALUES (@quiz_history, 'What wall fell in 1989 symbolizing the end of the Cold War?');
SET @hq5 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Great Wall of China', @hq5, FALSE),
('Berlin Wall', @hq5, TRUE),
('Hadrian''s Wall', @hq5, FALSE);

-- Q6
INSERT INTO Question (quiz_id, text) VALUES (@quiz_history, 'Which empire was ruled by Genghis Khan?');
SET @hq6 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Ottoman Empire', @hq6, FALSE),
('Mongol Empire', @hq6, TRUE),
('Roman Empire', @hq6, FALSE);

-- Q7
INSERT INTO Question (quiz_id, text) VALUES (@quiz_history, 'What ship sank in 1912 after hitting an iceberg?');
SET @hq7 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Lusitania', @hq7, FALSE),
('Titanic', @hq7, TRUE),
('Britannic', @hq7, FALSE);

-- Q8
INSERT INTO Question (quiz_id, text) VALUES (@quiz_history, 'Who was known as the Maid of OrlÃ©ans?');
SET @hq8 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Cleopatra', @hq8, FALSE),
('Joan of Arc', @hq8, TRUE),
('Marie Curie', @hq8, FALSE);

-- Q9 (multiple correct)
INSERT INTO Question (quiz_id, text) VALUES (@quiz_history, 'Which of the following occurred in the 20th century?');
SET @hq9 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('World War I', @hq9, TRUE),
('Renaissance', @hq9, FALSE),
('Moon Landing', @hq9, TRUE);

-- Q10
INSERT INTO Question (quiz_id, text) VALUES (@quiz_history, 'Which revolution began in 1789?');
SET @hq10 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('American Revolution', @hq10, FALSE),
('French Revolution', @hq10, TRUE),
('Russian Revolution', @hq10, FALSE);
-- Insert Quiz (science)
INSERT INTO Quiz (category, user_id) 
VALUES ('science', 1);

-- Get quiz_id
SET @quiz_science = LAST_INSERT_ID();

-- Q1
INSERT INTO Question (quiz_id, text) VALUES (@quiz_science, 'What gas do plants primarily absorb for photosynthesis?');
SET @sq1 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Oxygen', @sq1, FALSE),
('Carbon dioxide', @sq1, TRUE),
('Nitrogen', @sq1, FALSE);

-- Q2
INSERT INTO Question (quiz_id, text) VALUES (@quiz_science, 'What is the chemical symbol for gold?');
SET @sq2 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Ag', @sq2, FALSE),
('Au', @sq2, TRUE),
('Gd', @sq2, FALSE);

-- Q3
INSERT INTO Question (quiz_id, text) VALUES (@quiz_science, 'How many bones are in the adult human body?');
SET @sq3 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('206', @sq3, TRUE),
('205', @sq3, FALSE),
('210', @sq3, FALSE);

-- Q4
INSERT INTO Question (quiz_id, text) VALUES (@quiz_science, 'What part of the cell contains genetic material?');
SET @sq4 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Mitochondria', @sq4, FALSE),
('Nucleus', @sq4, TRUE),
('Ribosome', @sq4, FALSE);

-- Q5
INSERT INTO Question (quiz_id, text) VALUES (@quiz_science, 'What force keeps planets in orbit around the sun?');
SET @sq5 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Magnetism', @sq5, FALSE),
('Friction', @sq5, FALSE),
('Gravity', @sq5, TRUE);

-- Q6
INSERT INTO Question (quiz_id, text) VALUES (@quiz_science, 'What is the boiling point of water at sea level?');
SET @sq6 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('100°C', @sq6, TRUE),
('90°C', @sq6, FALSE),
('80°C', @sq6, FALSE);

-- Q7
INSERT INTO Question (quiz_id, text) VALUES (@quiz_science, 'Which vitamin is produced when skin is exposed to sunlight?');
SET @sq7 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Vitamin C', @sq7, FALSE),
('Vitamin D', @sq7, TRUE),
('Vitamin B12', @sq7, FALSE);

-- Q8 (multiple correct)
INSERT INTO Question (quiz_id, text) VALUES (@quiz_science, 'Which of the following are noble gases?');
SET @sq8 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Helium', @sq8, TRUE),
('Oxygen', @sq8, FALSE),
('Neon', @sq8, TRUE);

-- Q9
INSERT INTO Question (quiz_id, text) VALUES (@quiz_science, 'Which particle has a negative charge?');
SET @sq9 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Proton', @sq9, FALSE),
('Neutron', @sq9, FALSE),
('Electron', @sq9, TRUE);

-- Q10
INSERT INTO Question (quiz_id, text) VALUES (@quiz_science, 'What is the most abundant gas in Earth''s atmosphere?');
SET @sq10 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Oxygen', @sq10, FALSE),
('Nitrogen', @sq10, TRUE),
('Carbon dioxide', @sq10, FALSE);

-- ======================================
-- Insert Quiz (Sports)
INSERT INTO Quiz (category, user_id) 
VALUES ('sports', 1);

-- Get quiz_id
SET @quiz_sports = LAST_INSERT_ID();

-- Q1
INSERT INTO Question (quiz_id, text) VALUES (@quiz_sports, 'How many players are on a standard soccer team on the field?');
SET @sq1 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('11', @sq1, TRUE),
('10', @sq1, FALSE),
('9', @sq1, FALSE);

-- Q2
INSERT INTO Question (quiz_id, text) VALUES (@quiz_sports, 'Which sport uses a shuttlecock?');
SET @sq2 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Badminton', @sq2, TRUE),
('Tennis', @sq2, FALSE),
('Squash', @sq2, FALSE);

-- Q3
INSERT INTO Question (quiz_id, text) VALUES (@quiz_sports, 'In basketball, how many points is a shot from beyond the arc worth?');
SET @sq3 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('2', @sq3, FALSE),
('3', @sq3, TRUE),
('4', @sq3, FALSE);

-- Q4
INSERT INTO Question (quiz_id, text) VALUES (@quiz_sports, 'What surface is the French Open played on?');
SET @sq4 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Grass', @sq4, FALSE),
('Clay', @sq4, TRUE),
('Hard court', @sq4, FALSE);

-- Q5
INSERT INTO Question (quiz_id, text) VALUES (@quiz_sports, 'Which country hosted the 2016 Summer Olympics?');
SET @sq5 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Brazil', @sq5, TRUE),
('China', @sq5, FALSE),
('UK', @sq5, FALSE);

-- Q6
INSERT INTO Question (quiz_id, text) VALUES (@quiz_sports, 'In which sport would you perform a slam dunk?');
SET @sq6 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Volleyball', @sq6, FALSE),
('Basketball', @sq6, TRUE),
('Handball', @sq6, FALSE);

-- Q7
INSERT INTO Question (quiz_id, text) VALUES (@quiz_sports, 'How long is a marathon?');
SET @sq7 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('42.195 km', @sq7, TRUE),
('40.000 km', @sq7, FALSE),
('26.195 km', @sq7, FALSE);

-- Q8
INSERT INTO Question (quiz_id, text) VALUES (@quiz_sports, 'What is the maximum break in snooker?');
SET @sq8 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('147', @sq8, TRUE),
('155', @sq8, FALSE),
('167', @sq8, FALSE);

-- Q9 (multiple correct)
INSERT INTO Question (quiz_id, text) VALUES (@quiz_sports, 'Which of the following are Olympic sports?');
SET @sq9 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Swimming', @sq9, TRUE),
('Cricket', @sq9, FALSE),
('Tennis', @sq9, TRUE);

-- Q10
INSERT INTO Question (quiz_id, text) VALUES (@quiz_sports, 'In baseball, how many strikes make an out?');
SET @sq10 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('2', @sq10, FALSE),
('3', @sq10, TRUE),
('4', @sq10, FALSE);

-- ======================================
-- Insert Quiz (Technology)
INSERT INTO Quiz (category, user_id) 
VALUES ('technology', 1);

-- Get quiz_id
SET @quiz_tech = LAST_INSERT_ID();

-- Q1
INSERT INTO Question (quiz_id, text) VALUES (@quiz_tech, 'What does CPU stand for?');
SET @tq1 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Central Processing Unit', @tq1, TRUE),
('Computer Personal Unit', @tq1, FALSE),
('Central Program Unit', @tq1, FALSE);

-- Q2
INSERT INTO Question (quiz_id, text) VALUES (@quiz_tech, 'Which company developed the Android OS?');
SET @tq2 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Apple', @tq2, FALSE),
('Google', @tq2, TRUE),
('Microsoft', @tq2, FALSE);

-- Q3
INSERT INTO Question (quiz_id, text) VALUES (@quiz_tech, 'What does HTML stand for?');
SET @tq3 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Hyper Trainer Marking Language', @tq3, FALSE),
('HyperText Markup Language', @tq3, TRUE),
('HighText Machine Language', @tq3, FALSE);

-- Q4
INSERT INTO Question (quiz_id, text) VALUES (@quiz_tech, 'Which device is used to input text into a computer?');
SET @tq4 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Monitor', @tq4, FALSE),
('Keyboard', @tq4, TRUE),
('Speaker', @tq4, FALSE);

-- Q5
INSERT INTO Question (quiz_id, text) VALUES (@quiz_tech, 'What is the name for malicious software?');
SET @tq5 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Firmware', @tq5, FALSE),
('Malware', @tq5, TRUE),
('Shareware', @tq5, FALSE);

-- Q6
INSERT INTO Question (quiz_id, text) VALUES (@quiz_tech, 'Which company created the iPhone?');
SET @tq6 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Apple', @tq6, TRUE),
('Samsung', @tq6, FALSE),
('Nokia', @tq6, FALSE);

-- Q7 (multiple correct)
INSERT INTO Question (quiz_id, text) VALUES (@quiz_tech, 'Which of the following are programming languages?');
SET @tq7 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Python', @tq7, TRUE),
('JavaScript', @tq7, TRUE),
('Photoshop', @tq7, FALSE);

-- Q8
INSERT INTO Question (quiz_id, text) VALUES (@quiz_tech, 'Which protocol secures data on the web?');
SET @tq8 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('HTTP', @tq8, FALSE),
('FTP', @tq8, FALSE),
('HTTPS', @tq8, TRUE);

-- Q9
INSERT INTO Question (quiz_id, text) VALUES (@quiz_tech, 'What does IoT stand for?');
SET @tq9 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Internet of Things', @tq9, TRUE),
('Interface of Tech', @tq9, FALSE),
('Input Output Tech', @tq9, FALSE);

-- Q10
INSERT INTO Question (quiz_id, text) VALUES (@quiz_tech, 'Which company owns GitHub?');
SET @tq10 = LAST_INSERT_ID();
INSERT INTO Answer (text, question_id, status) VALUES
('Google', @tq10, FALSE),
('Microsoft', @tq10, TRUE),
('Meta', @tq10, FALSE);
