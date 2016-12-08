module ApplicationHelper

  def csrf_token
    "<input type=\"hidden\" name=\"authenticity_token\" value=\"#{form_authenticity_token}\" >".html_safe
  end

  def submit_button(text="Submit")
    "<input type=\"submit\" value=#{html_escape(text)}>".html_safe
  end
end
