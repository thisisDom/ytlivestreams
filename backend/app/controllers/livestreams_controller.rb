class LivestreamsController < ApplicationController
  def index
    access_token = params[:tk]
    page_token = params[:pageToken]
    max_results = params[:maxResults] || 50
    youtube = Google::Apis::YoutubeV3::YouTubeService.new
    youtube.authorization = access_token
    begin
    live_streams = youtube.list_searches('snippet', event_type:  "live", max_results: max_results, order: 'viewcount', type: 'video', page_token: page_token, region_code: 'US', relevance_language: 'EN', video_category_id: 20, fields: "etag,items(id,snippet(channelTitle,description,thumbnails/high,title)),nextPageToken,prevPageToken")
  rescue => e
      puts e
      render json: { }, status: 400
    else
      render json: { streams: live_streams.as_json }, status: 200
    end
  end

  def show
    access_token = params[:tk]
    youtube = Google::Apis::YoutubeV3::YouTubeService.new
    youtube.authorization = access_token
    begin
      live_stream = youtube.list_videos('liveStreamingDetails, statistics', id: params[:id], fields: 'items(liveStreamingDetails,statistics/viewCount)')
    rescue
      render json: { }, status: 400
    else
      render json: { stream: live_stream.as_json }, status: 200
    end
  end

  private

end
