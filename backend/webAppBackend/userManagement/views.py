from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

@api_view(['POST'])
def register(request):
    data = request.data

    # Validate request data
    if 'username' not in data or 'password' not in data:
        return Response({'error': 'Username and password are required'}, status=400)

    if User.objects.filter(username=data['username']).exists():
        return Response({'error': 'User already exists'}, status=400)

    # Validate password strength
    try:
        validate_password(data['password'])  # ✅ Check password strength
    except ValidationError as e:
        return Response({'error': e.messages}, status=400)  # ✅ Return weak password message

    # Create user
    user = User.objects.create_user(username=data['username'], password=data['password'])
    return Response({'message': 'User created successfully'}, status=201)


# Generate JWT tokens manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# Login API
@api_view(['POST'])
def login(request):
    data = request.data
    user = authenticate(username=data['username'], password=data['password'])
    if user:
        tokens = get_tokens_for_user(user)
        return Response(tokens)
    else:
        return Response({'error': 'Invalid credentials'}, status=400)

# Protected API (Only accessible with JWT)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': 'You have access to this view!'})
