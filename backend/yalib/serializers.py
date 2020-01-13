from rest_framework import serializers
from .models import Library, Book, Author, Lender


class LibraryOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = ['id', 'name']


class AuthorOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'first_name', 'last_name', 'year_of_birth']


class LenderOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lender
        fields = ['id', 'first_name', 'last_name', 'year_of_birth', 'lending_date']


class BookListSerializer(serializers.ModelSerializer):
    library_name = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'title', 'genre', 'library_name']

    def get_library_name(self, obj):
        return obj.library.name if obj.library else ''


class BookFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class LenderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lender
        fields = ['id', 'first_name', 'last_name', 'year_of_birth', 'lending_date']


class LenderFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lender
        fields = '__all__'
