from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from .models import Room


class SessionRoomManagementTestCase(APITestCase):
    """Test session-based room joining and leaving functionality"""
    
    def setUp(self):
        """Set up test data"""
        self.user = User.objects.create_user(
            username='testhost',
            password='testpass123'
        )
        self.room1 = Room.objects.create(
            name='Test Room 1',
            host=self.user,
            code=12345
        )
        self.room2 = Room.objects.create(
            name='Test Room 2', 
            host=self.user,
            code=54321
        )
    
    def test_session_join_room_success(self):
        """Test successfully joining a room via session"""
        url = reverse('session-room-join', kwargs={'pk': self.room1.code})
        response = self.client.post(url)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('Successfully joined room', response.data['message'])
        self.assertEqual(response.data['room']['code'], self.room1.code)
        
        # Check session data
        session = self.client.session
        self.assertEqual(session['current_room'], str(self.room1.code))
    
    def test_session_join_nonexistent_room(self):
        """Test joining a room that doesn't exist"""
        url = reverse('session-room-join', kwargs={'pk': 99999})
        response = self.client.post(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('Room not found', response.data['error'])
    
    def test_session_join_same_room_twice(self):
        """Test joining the same room twice - should return already joined message"""
        url = reverse('session-room-join', kwargs={'pk': self.room1.code})
        
        # Join room first time
        response1 = self.client.post(url)
        self.assertEqual(response1.status_code, status.HTTP_201_CREATED)
        
        # Join same room second time
        response2 = self.client.post(url)
        self.assertEqual(response2.status_code, status.HTTP_200_OK)
        self.assertIn('Already joined this room', response2.data['message'])
    
    def test_session_join_different_room_while_in_another(self):
        """Test joining a different room while already in one - should fail"""
        # Join first room
        url1 = reverse('session-room-join', kwargs={'pk': self.room1.code})
        response1 = self.client.post(url1)
        self.assertEqual(response1.status_code, status.HTTP_201_CREATED)
        
        # Try to join second room
        url2 = reverse('session-room-join', kwargs={'pk': self.room2.code})
        response2 = self.client.post(url2)
        self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('already in another room', response2.data['error'])
    
    def test_session_leave_room_success(self):
        """Test successfully leaving a room"""
        # First join a room
        join_url = reverse('session-room-join', kwargs={'pk': self.room1.code})
        self.client.post(join_url)
        
        # Then leave the room
        leave_url = reverse('session-room-leave')
        response = self.client.post(leave_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Successfully left room', response.data['message'])
        
        # Check session data is cleared
        session = self.client.session
        self.assertNotIn('current_room', session)
    
    def test_session_leave_room_when_not_in_room(self):
        """Test leaving a room when not in any room"""
        url = reverse('session-room-leave')
        response = self.client.post(url)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('not currently in any room', response.data['error'])
    
    def test_session_get_current_room_when_in_room(self):
        """Test getting current room when in a room"""
        # Join a room first
        join_url = reverse('session-room-join', kwargs={'pk': self.room1.code})
        self.client.post(join_url)
        
        # Get current room
        url = reverse('session-current-room')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Currently in room', response.data['message'])
        self.assertEqual(response.data['room']['code'], self.room1.code)
    
    def test_session_get_current_room_when_not_in_room(self):
        """Test getting current room when not in any room"""
        url = reverse('session-current-room')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Not currently in any room', response.data['message'])
        self.assertIsNone(response.data['room'])
    
    def test_session_get_current_room_when_room_deleted(self):
        """Test getting current room when the room has been deleted"""
        # Join a room first
        join_url = reverse('session-room-join', kwargs={'pk': self.room1.code})
        self.client.post(join_url)
        
        # Delete the room
        self.room1.delete()
        
        # Try to get current room
        url = reverse('session-current-room')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('no longer exists', response.data['message'])
        self.assertIsNone(response.data['room'])
        
        # Check session is cleaned up
        session = self.client.session
        self.assertNotIn('current_room', session)
    
    def test_one_room_limit_enforcement(self):
        """Test that the one-room limit is properly enforced"""
        # Join first room
        url1 = reverse('session-room-join', kwargs={'pk': self.room1.code})
        response1 = self.client.post(url1)
        self.assertEqual(response1.status_code, status.HTTP_201_CREATED)
        
        # Try to join second room - should fail
        url2 = reverse('session-room-join', kwargs={'pk': self.room2.code})
        response2 = self.client.post(url2)
        self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)
        
        # Leave first room
        leave_url = reverse('session-room-leave')
        leave_response = self.client.post(leave_url)
        self.assertEqual(leave_response.status_code, status.HTTP_200_OK)
        
        # Now should be able to join second room
        response3 = self.client.post(url2)
        self.assertEqual(response3.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response3.data['room']['code'], self.room2.code)
