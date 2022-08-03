from django.urls import include, path
from .views import *


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('ownership-history/', OwnershipHistory.as_view()),
    path('property-history/', PropertyHistory.as_view()),
    path('zoning-history/', ZoningHistory.as_view()),
    path('assessment-history/', AssessmentHistory.as_view()),
    path('permit-history/', PermitHistory.as_view()),
    path('elevation-certificate/', ElevationCertificate.as_view()),
    path('general-info/', GeneralInfo.as_view())
]