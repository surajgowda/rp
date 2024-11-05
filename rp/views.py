from django.shortcuts import render
import datetime
from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

# Home page, redirects to other dashboards based on user type

def home(request):
    return render(request, 'index.html')

def prog1(request):
    return render(request, '1pro.html')

def prog2(request):
    return render(request, '2pro.html')

def prog3(request):
    return render(request, '3pro.html')

def prog7(request):
    return render(request, '7pro.html')

def prog8(request):
    return render(request, '8pro.html')

def prog9(request):
    return render(request, '9pro.html')

def binomial(request):
    return render(request, 'binomial.html')

def normal(request):
    return render(request, 'normal.html')

def poisson(request):
    return render(request, 'poisson.html')

def uniform(request):
    return render(request, 'uniform.html')

def student(request):
    return render(request, 'student.html')

def thanks(request):
    return render(request, 'thanks.html')

@login_required
def discussion(request):
    # Fetch all answers
    answers = Answer.objects.all()
    
    # Group answers by question
    answer_dict = {}
    for answer in answers:
        question_id = answer.question.id
        if question_id not in answer_dict:
            answer_dict[question_id] = []
        answer_dict[question_id].append(answer)

    # Fetch answered question IDs
    answered_questions = Answer.objects.values_list('question_id', flat=True)
    
    # Get all questions that do not have answers
    questions = Questions.objects.exclude(id__in=answered_questions)    
    print(answer_dict)
    return render(request, 'discussion.html', {
        'answers': answer_dict,
        'questions': questions
    })


@login_required    
def feedback(request):
    if request.method == 'POST':
        feedback = request.POST.get('feedback')
        Feedback.objects.create(user=request.user, feedback=feedback)
        return redirect('user')
    else:
        return render(request, 'feedback.html')

@login_required
def post_answer(request, question_id):
    if request.method == 'POST':
        answer = request.POST.get('answer')
        answered_by = request.user
        attachment = request.FILES.get('attachment')
        question = get_object_or_404(Questions, id=question_id)
        date = datetime.date.today()
        time = datetime.datetime.now().time()
        Answer.objects.create(
            question=question, 
            answer=answer, 
            answered_by=answered_by, 
            attachment=attachment, 
            date=date, 
            time=time)
        return redirect('discussion')
    else:
        question = get_object_or_404(Questions, id=question_id)
        return render(request, 'post_answer.html', {'question': question})

# def home(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         try:
#             user = CustomUser.objects.get(username=username)
#             print("Fetching user")
#         except:
#             return render(request, 'login.html', {'error': True})
#         if not user.has_usable_password():
#             return redirect('password_reset',id=username)
            
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             if request.user.type=='admin':
#                 return redirect('admin')
#             else:
#                 return redirect('user')
#         else:
#             # Render login page with error message
#             return render(request, 'login.html', {'error': True})
#     else:
#         if request.user.is_authenticated:
#             user = request.user.type
#             if request.user.type=='admin':
#                 return redirect('admin')
#             else:
#                 return redirect('user')
#         else:
#             # User is not logged in, render login page
#             return render(request, 'login.html')

# def user_dashboard(request):
#     if request.user.is_authenticated:
#         return render(request, 'user_dashboard.html')
#     else:
#         return redirect('home')
    
# def admin_dashboard(request):
#     if request.user.is_authenticated:
#         return render(request, 'admin_dashboard.html')
#     else:
#         return redirect('home')

# def profile(request):
#     user = request.user
#     if user.student:
#         student = user.Student
#         return render(request, 'profile.html', {'profile': student})
#     else:
#         faculty = user.faculty
#         return render(request, 'profile.html', {'profile': faculty})


@login_required
def post_question(request):
    if request.method == 'POST':
        question = request.POST.get('question')
        asked_by = request.user
        attachment = request.FILES.get('attachment')
        subject = Subjects.objects.get(name = 'Statistical Computation and R Programming')
        date = datetime.date.today()
        time = datetime.datetime.now().time()
        Questions.objects.create(
            question=question, 
            asked_by=asked_by, 
            attachment=attachment, 
            subject=subject, 
            date=date, 
            time=time)
        return redirect('discussion')
    else:
        return render(request, 'post_question.html')

def logout_view(request):
    logout(request)
    return redirect('home')