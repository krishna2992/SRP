from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import LeaveApplication, BonafideApplication
from .serializers import LeaveApplicationSerializer, LeaveApplicationWithStudentSerializer, BonafideApplicationSerializer, BonafideStudentSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

@api_view(['POST'])
def post_leave_application(request):
    if request.method == 'POST':
        serializer = LeaveApplicationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)  # Return success response
        return Response(serializer.errors, status=400)  # Return error response if validation fails
    
@api_view(['POST'])
@permission_classes([AllowAny])
def post_bonafide_application(request):
    if request.method == 'POST':
        serializer = BonafideApplicationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)  # Return success response
        return Response(serializer.errors, status=400)  # Return error response if validation fails

@api_view(['GET'])
@permission_classes([AllowAny])
def get_applications_by_status(request):
    status = request.query_params.get('status', 'pending')
    if status is None:
        return Response({'error': 'Status parameter is required'}, status=400)

    applications = LeaveApplication.objects.filter(status=status).select_related('student')
    serializer = LeaveApplicationWithStudentSerializer(applications,context={'request': request}, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_bonafide_by_status(request):
    status = request.query_params.get('status', 'pending')
    if status is None:
        return Response({'error': 'Status parameter is required'}, status=400)

    applications = BonafideApplication.objects.filter(status=status).select_related('student')
    serializer = BonafideStudentSerializer(applications,context={'request': request}, many=True)
    return Response(serializer.data)




@api_view(['PUT'])
def update_application_status(request, pk):
    try:
        application = LeaveApplication.objects.get(pk=pk)
    except LeaveApplication.DoesNotExist:
        return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        status_value = request.data.get('status')
        if status_value not in ['pending', 'approved', 'rejected']:
            return Response({'error': 'Invalid status value'}, status=status.HTTP_400_BAD_REQUEST)

        application.status = status_value
        application.save()
        serializer = LeaveApplicationSerializer(application)
        return Response(serializer.data)

    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PUT'])
def update_bonafide_status(request, pk):
    try:
        application = BonafideApplication.objects.get(pk=pk)
    except BonafideApplication.DoesNotExist:
        return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        status_value = request.data.get('status')
        print(request.data)
        if status_value not in ['pending', 'approved', 'rejected']:
            return Response({'error': 'Invalid status value'}, status=status.HTTP_400_BAD_REQUEST)

        application.status = status_value
        application.save()
        serializer = BonafideApplicationSerializer(application)
        return Response(serializer.data)

    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
