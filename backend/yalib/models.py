from django.db import models


class Library(models.Model):
    name = models.TextField()
    address = models.TextField(null=True)

    def __str__(self):
        return self.name

class Lender(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    year_of_birth = models.IntegerField()
    lending_date = models.DateField()

    def __str__(self):
        return self.first_name


class Book(models.Model):
    CHOICES = (
        ('a', 'Adventure'),
        ('b', 'Biography'),
        ('c', 'Crime'),
        ('f', 'Fiction')
    )

    title = models.TextField()
    genre = models.CharField(max_length=1, choices=CHOICES, null=True)
    release_date = models.DateField()
    plot = models.TextField()
    pages = models.PositiveIntegerField(help_text='without Table of Contents')
    e_book = models.BooleanField()
    authors = models.ManyToManyField('Author', blank=True)
    library = models.ForeignKey(Library, on_delete=models.CASCADE, null=True)
    lender = models.ForeignKey(Lender, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title



class Author(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    year_of_birth = models.IntegerField()

    def __str__(self):
        return '%s %s (%s)' % (self.first_name, self.last_name, self.year_of_birth)
