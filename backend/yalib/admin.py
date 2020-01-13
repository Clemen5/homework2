from django.contrib import admin
from .models import *

class BookAdmin(admin.ModelAdmin): pass

class AuthorAdmin(admin.ModelAdmin): pass

class LibraryAdmin(admin.ModelAdmin): pass

class LenderAdmin(admin.ModelAdmin): pass



admin.site.register(Book, BookAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(Library, LibraryAdmin)
admin.site.register(Lender, LenderAdmin)

