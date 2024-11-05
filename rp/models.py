from django.db import models
from django.contrib.auth.models import AbstractUser

class Faculty(models.Model):
    name = models.CharField(max_length=255)
    date_of_joining = models.DateField()
    CLASS_TIME_CHOICES = [
        (1, 'Morning'),
        (2, 'Afternoon'),
        (3, 'Evening'),
    ]
    class_time_preference = models.IntegerField(choices=CLASS_TIME_CHOICES)

    def __str__(self):
        return self.name


class Program(models.Model):
    SEMESTER_CHOICES = [
        (1, 'Odd'),
        (2, 'Even'),
    ]
    hod = models.ForeignKey(Faculty, on_delete=models.SET_NULL, null=True, related_name='hod_programs')
    vision = models.TextField()
    mission = models.TextField()
    ongoing_semester = models.IntegerField(choices=SEMESTER_CHOICES)

    def __str__(self):
        return f'Program with HoD: {self.hod.name}'


class Subjects(models.Model):
    CORE = 'core'
    OPTIONAL = 'optional'
    SUBJECT_TYPE_CHOICES = [
        (CORE, 'Core'),
        (OPTIONAL, 'Optional'),
    ]
    name = models.CharField(max_length=255)
    subject_code = models.CharField(max_length=100)
    subject_type = models.CharField(max_length=10, choices=SUBJECT_TYPE_CHOICES)
    faculty_incharge = models.ManyToManyField(Faculty)
    class_fk = models.ForeignKey('Class', on_delete=models.CASCADE, related_name='subjects')

    def __str__(self):
        return self.name


class Class(models.Model):
    name = models.CharField(max_length=255)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    room_no = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class Student(models.Model):
    name = models.CharField(max_length=255)
    optional_opted = models.ForeignKey(Subjects, on_delete=models.SET_NULL, null=True, related_name='optional_students')
    dob = models.DateField()
    blood_group = models.CharField(max_length=5)
    phno = models.CharField(max_length=15)
    email = models.EmailField()
    student_class = models.ForeignKey(Class, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class TimeTable(models.Model):
    date = models.DateField()
    subject = models.ForeignKey(Subjects, on_delete=models.CASCADE, related_name='timetables')
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f'{self.subject.name} on {self.date}'


class Attendance(models.Model):
    schedule = models.ForeignKey(TimeTable, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, related_name='attendances')

    def __str__(self):
        return f'Attendance for {self.schedule}'


class Announcement(models.Model):
    title = models.CharField(max_length=255)
    subject = models.ForeignKey(Subjects, on_delete=models.CASCADE, related_name='announcements')
    description = models.TextField()
    attachment = models.FileField(upload_to='announcements/', blank=True, null=True)
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return self.title


class Notification(models.Model):
    to = models.ManyToManyField(Student, related_name='notifications')
    message = models.TextField()
    sent_by = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='sent_notifications')
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return f'Notification from {self.sent_by.name}'


class Questions(models.Model):
    question = models.TextField()
    asked_by = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='asked_questions')
    attachment = models.FileField(upload_to='questions/', blank=True, null=True)
    subject = models.ForeignKey(Subjects, on_delete=models.CASCADE, related_name='questions')
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return self.question
    
class Answer(models.Model):
    question = models.ForeignKey(Questions, on_delete=models.CASCADE, related_name='answers')
    answer = models.TextField()
    answered_by = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='given_answers')
    date = models.DateField()
    time = models.TimeField()
    attachment = models.FileField(upload_to='answers/', blank=True, null=True)

    def __str__(self):
        return f'Answer to: {self.question}'


class CustomUser(AbstractUser):
    student = models.ForeignKey('Student', on_delete=models.CASCADE, blank=True, null=True)
    faculty = models.ForeignKey('Faculty', on_delete=models.CASCADE, blank=True, null=True)
    type = models.CharField(max_length=10, blank=True, null=True)
    pic = models.ImageField(upload_to='profile_pics/', blank=True, null=True)   
    groups = None
    user_permissions = None

    def __str__(self):
        return self.username
    

class Feedback(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=True, null=True)
    feedback = models.TextField(blank=True, null=True)
    screenshot = models.ImageField(upload_to='feedback/', blank=True, null=True)
    date = models.DateField(auto_now=True, blank=True, null=True)
    resolved = models.BooleanField(blank=True, null=True)

    def __str__(self):
        return self.user.username + " - " + str(self.date)