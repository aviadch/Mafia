import time
from random import randrange

from flask import request, jsonify, Blueprint

api = Blueprint('api', 'api', url_prefix='/api')


@api.route('/room/create', methods=['POST'])
def createRoom():
    creator_id = request.get_json().get('creatorID')
    room_id = randrange(999999999)
    creation_date = time.time()
    room_socket_port = randrange(30000, 50000)

    return jsonify({'roomID': room_id, 'creationDate': creation_date, 'roomSocketPort': room_socket_port})
