import requests
import xmltodict

from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

url_map = {
    "property_history": "https://maps.nashville.gov/ParcelService/Search.asmx/GetPropertyHistory",
    "ownership_history": "https://maps.nashville.gov/ParcelService/Search.asmx/GetOwnerHistory",
    "zoning_history": "https://maps.nashville.gov/ParcelService/Search.asmx/GetZoningHistory",
    "assessment_history": "https://maps.nashville.gov/ParcelService/Search.asmx/GetAssessmentHistory",
    "permit_history": "https://maps.nashville.gov/ParcelService/Search.asmx/GetPermitHistory",
    "elevation_certificate": "https://maps.nashville.gov/ParcelService/Search.asmx/GetFEC",
    "general_info": "https://maps.nashville.gov/ParcelService/Search.asmx/GetGenInfo"
}


class OwnershipHistory(APIView):

    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):

        pin = request.GET["pin"]
        request_url = url_map.get("ownership_history")
        params = get_params("pin", pin)
        resp = requests.get(request_url, params=params)
        text = resp.text
        json_resp = xmltodict.parse(text)
        key = list(json_resp.keys())[0]
        json_resp = json_resp[key]["anyType"]
        if not isinstance(json_resp, list):
            json_resp = [json_resp]

        return Response(data=json_resp)


class PropertyHistory(APIView):

    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):

        pin = request.GET["pin"]
        request_url = url_map.get("property_history")
        params = get_params("pin", pin)
        resp = requests.get(request_url, params=params)
        text = resp.text
        json_resp = xmltodict.parse(text)
        key = list(json_resp.keys())[0]
        json_resp = json_resp[key]["anyType"]
        if not isinstance(json_resp, list):
            json_resp = [json_resp]

        return Response(data=json_resp)


class ZoningHistory(APIView):

    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):

        pin = request.GET["pin"]
        request_url = url_map.get("zoning_history")
        params = get_params("pin", pin)
        resp = requests.get(request_url, params=params)
        text = resp.text
        json_resp = xmltodict.parse(text)
        key = list(json_resp.keys())[0]
        json_resp = json_resp[key]["anyType"]
        if not isinstance(json_resp, list):
            json_resp = [json_resp]

        return Response(data=json_resp)


class AssessmentHistory(APIView):

    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):

        pin = request.GET["pin"]
        request_url = url_map.get("assessment_history")
        params = get_params("pin", pin)
        resp = requests.get(request_url, params=params)
        text = resp.text
        json_resp = xmltodict.parse(text)
        key = list(json_resp.keys())[0]
        json_resp = json_resp[key]["anyType"]
        if not isinstance(json_resp, list):
            json_resp = [json_resp]

        return Response(data=json_resp)


class PermitHistory(APIView):

    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):

        pin = request.GET["apn"]
        request_url = url_map.get("permit_history")
        params = get_params("apn", pin)
        resp = requests.get(request_url, params=params)
        text = resp.text
        json_resp = xmltodict.parse(text)
        key = list(json_resp.keys())[0]
        json_resp = json_resp[key]["anyType"]
        if not isinstance(json_resp, list):
            json_resp = [json_resp]

        return Response(data=json_resp)


class ElevationCertificate(APIView):

    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):

        pin = request.GET["apn"]
        request_url = url_map.get("elevation_certificate")
        params = get_params("apn", pin)
        resp = requests.get(request_url, params=params)
        text = resp.text
        json_resp = xmltodict.parse(text)
        key = list(json_resp.keys())[0]
        json_resp = json_resp[key]["anyType"]
        if not isinstance(json_resp, list):
            json_resp = [json_resp]

        return Response(data=json_resp)


class GeneralInfo(APIView):

    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):

        pin = request.GET["pin"]
        request_url = url_map.get("general_info")
        params = get_params("pin", pin)
        resp = requests.post(request_url, data=params)
        text = resp.text
        json_resp = xmltodict.parse(text)
        key = list(json_resp.keys())[0]
        json_resp = json_resp[key]["anyType"]
        # if not isinstance(json_resp, list):
        #     json_resp = [json_resp]

        return Response(data=json_resp)


def get_params(key, value):
    return {'onlyactive': 'false', key: value}