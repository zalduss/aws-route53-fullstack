from django.urls import path
from todo.views import TodoListView, TodoDetailView, ServerView

urlpatterns = [
    path('', TodoListView.as_view(), name='todo_list'),
    path('<int:pk>/', TodoDetailView.as_view(), name='todo_detail'),
    path('server/', ServerView, name='server'),
]
