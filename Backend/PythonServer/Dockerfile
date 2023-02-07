FROM python:3.7.6-buster

RUN pip install pandas
RUN pip install django
RUN pip install django-cors-headers
RUN pip install sklearn
RUN pip install -U scikit-learn
ENV PYTHONUNBUFFERED=1
EXPOSE 8000
COPY . .
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
