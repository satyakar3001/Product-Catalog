from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Product
from django.forms.models import model_to_dict

@api_view(["GET"])
def home(request):
    return HttpResponse("<h1>Hello World !</h1>")

@api_view(["GET"])
def getProducts(request):
    """
    Returns the list of Products
    """
    products = Product.objects.all().values()
    return JsonResponse(list(products), safe=False)


@api_view(["POST"])
def addProduct(request):
    """
    Add the product in database/inventory
    """
    try:
        data = request.data
        product = Product.objects.create(
            name = data.get("name"),
            price = data.get("price"),
            available = data.get("available", True),
            description = data.get("description")
        )
        return JsonResponse({
            "message": "Product Created", 
            "prodId" : product.prodId
        }, status = status.HTTP_201_CREATED)
    except Exception as e:
        # return JsonResponse({"Error": e}, status = status.HTTP_400_BAD_REQUEST)
        return JsonResponse({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def getProductbyId(request, pk):
    """
    Get Product by product Id
    """
    try:
        prod = Product.objects.get(pk=pk)
        return JsonResponse(model_to_dict(prod), status = status.HTTP_200_OK)
    except Exception as e:
        return JsonResponse({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)