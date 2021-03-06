<?php

namespace App\Http\Controllers;

use App\Height;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();


class HeightController extends Controller
{
    public function showAllHeights()
    {
        $heightQuery = DB::select(DB::raw('SELECT *,UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM sc_body_measurement.height FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($heightQuery);

        // return response()->json(Height::all());
    }

    public function showOneHeight($id)
    {
        return response()->json(Height::find($id));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();
        $uuid = Uuid::uuid4();

        $heightData = array(
            'uuid' => $uuid,
            'ptUUID' => $requestData['data']['ptUUID'],
            'heightInInch' => $requestData['data']['heightInInch'],
            'measurementDate' => $requestData['data']['measurementDate'],
            'notes' => $requestData['data']['notes'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );
       
        $Height = Height::insertGetId($heightData);

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForHeightToAdd';
        $message = array(
            'uuid' => $uuid,
            'ptUUID' => $requestData['data']['ptUUID'],
            'heightInInch' => $requestData['data']['heightInInch'],
            'measurementDate' => $requestData['data']['measurementDate'],
            'notes' => $requestData['data']['notes'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['data']['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );
        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($Height, 201);
    }

    public function update($id, Request $request)
    {
        $Height = Height::findOrFail($id);
        $Height->update($request->all());

        /**
         * Send data to socket
         */
        $requestData = $request->all();
        $channel = 'MsgFromSktForHeightToChange';
        $message = array(
            'uuid' => $id,
            'ptUUID' => $requestData['data']['ptUUID'],
            'heightInInch' => $requestData['data']['heightInInch'],
            'measurementDate' => $requestData['data']['measurementDate'],
            'notes' => $requestData['data']['notes'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($Height, 200);
    }

    public function delete($id)
    {
        Height::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }

    public function discontinue($id, Request $request)
    {
        $Height = Height::findOrFail($id);
        $requestData = $request->all();

        if(isset($requestData['dNotes']) && !empty($requestData['dNotes']))
        {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $Height->update($updateData);
        }

        $Height->delete();

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForRemToDiscontinue';
        $message = array(
            'uuid' => $id,
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response('Discontinued successfully', 200);
    }
}