from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token

from . import views

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('library/options', views.library_option_list),
    path('author/options', views.author_option_list),
    path('lender/options', views.lender_option_list),
    path('book/list', views.book_list),
    path('lender/list', views.lender_list),
    path('book/create', views.book_form_create),
    path('lender/create', views.lender_form_create),
    path('book/<int:pk>/get', views.book_form_get),
    path('book/<int:pk>/update', views.book_form_update),
    path('book/<int:pk>/delete', views.book_delete),
    path('lender/<int:pk>/get', views.lender_form_get),
    path('lender/<int:pk>/update', views.lender_form_update),
    path('lender/<int:pk>/delete', views.lender_delete),
    url(r'^api-token-auth/', obtain_jwt_token),



    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
