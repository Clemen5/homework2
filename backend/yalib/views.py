from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from yalib.models import Library, Book, Author, Lender
from yalib.serializers import LibraryOptionSerializer, BookListSerializer, BookFormSerializer, AuthorOptionSerializer, \
    LenderFormSerializer, LenderListSerializer, LenderOptionSerializer


@swagger_auto_schema(method='GET', responses={200: LibraryOptionSerializer(many=True)})
@api_view(['GET'])
def library_option_list(request):
    libraries = Library.objects.all()
    serializer = LibraryOptionSerializer(libraries, many=True)
    return Response(serializer.data)

@swagger_auto_schema(method='GET', responses={200: AuthorOptionSerializer(many=True)})
@api_view(['GET'])
def author_option_list(request):
    authors = Author.objects.all()
    serializer = AuthorOptionSerializer(authors, many=True)
    return Response(serializer.data)

@swagger_auto_schema(method='GET', responses={200: LenderOptionSerializer(many=True)})
@api_view(['GET'])
def lender_option_list(request):
    lenders = Lender.objects.all()
    serializer = LenderOptionSerializer(lenders, many=True)
    return Response(serializer.data)

@swagger_auto_schema(method='GET', responses={200: BookListSerializer(many=True)})
@api_view(['GET'])
def book_list(request):
    books = Book.objects.all()
    serializer = BookListSerializer(books, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=BookFormSerializer, responses={200: BookFormSerializer()})
@api_view(['POST'])
def book_form_create(request):
    data = JSONParser().parse(request)
    serializer = BookFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=BookFormSerializer, responses={200: BookFormSerializer()})
@api_view(['PUT'])
def book_form_update(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response({'error': 'Book does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = BookFormSerializer(book, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: BookFormSerializer()})
@api_view(['GET'])
def book_form_get(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response({'error': 'Book does not exist.'}, status=404)

    serializer = BookFormSerializer(book)
    return Response(serializer.data)


@api_view(['DELETE'])
def book_delete(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Library.DoesNotExist:
        return Response({'error': 'Book does not exist.'}, status=404)
    book.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200: BookListSerializer(many=True)})
@api_view(['GET'])
def book_list(request):
    books = Book.objects.all()
    serializer = BookListSerializer(books, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=LenderFormSerializer, responses={200: LenderFormSerializer()})
@api_view(['POST'])
def lender_form_create(request):
    data = JSONParser().parse(request)
    serializer = LenderFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=LenderFormSerializer, responses={200: LenderFormSerializer()})
@api_view(['PUT'])
def lender_form_update(request, pk):
    try:
        lender = Lender.objects.get(pk=pk)
    except Lender.DoesNotExist:
        return Response({'error': 'Lender does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = LenderFormSerializer(lender, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: LenderFormSerializer()})
@api_view(['GET'])
def lender_form_get(request, pk):
    try:
        lender = Lender.objects.get(pk=pk)
    except Lender.DoesNotExist:
        return Response({'error': 'Lender does not exist.'}, status=404)

    serializer = LenderFormSerializer(lender)
    return Response(serializer.data)


@api_view(['DELETE'])
def lender_delete(request, pk):
    try:
        lender = Lender.objects.get(pk=pk)
    except Lender.DoesNotExist:
        return Response({'error': 'Lender does not exist.'}, status=404)
    lender.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200: LenderListSerializer(many=True)})
@api_view(['GET'])
def lender_list(request):
    lenders = Lender.objects.all()
    serializer = LenderListSerializer(lenders, many=True)
    return Response(serializer.data)
