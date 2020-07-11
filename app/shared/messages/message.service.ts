import { I18nService } from '../i18n/i18n.service';
import { Injectable } from '@angular/core';
import { MessageType, MessageStyle } from 'src/app/Models/Enum/SystemEnum';
import { NotificationService } from './notification.service';

@Injectable()
export class MessageService {

  private messageTypes = {};

  constructor(private notificationService: NotificationService, private i18n: I18nService) {
    this.messageTypes = {
      'bigBox': function (message: string, body: string, type: MessageType, icon: string, timeout: number) {
        notificationService.bigBox({
          title: i18n.getTranslation(message),
          content: i18n.getTranslation(body),
          color: type,
          timeout: timeout,
          icon: 'fa fa-fw fa-lg ' + icon,
        });
      },
      'smallBox': function (message: string, body: string, type: MessageType, icon: string, timeout: number) {
        notificationService.smallBox({
          title: i18n.getTranslation(message),
          content: i18n.getTranslation(body),
          color: type,
          iconSmall: 'fa fa-fw fa-lg ' + icon,
          timeout: timeout
        });
      }
    };
  }

  public showLoadError(message: string = 'Error loading date', body: string = 'RefreshPageError', icon: string = 'fa-times', style: MessageStyle = MessageStyle.smallBox, timeout: number = 4000) {
    this.showError(message, body, icon, style, timeout);
  }

  public showDeleteError(message: string = 'Error', body: string = 'Couldnt Delete data', icon: string = 'fa-times', style: MessageStyle = MessageStyle.smallBox, timeout: number = 4000) {
    this.showError(message, body, icon, style, timeout);
  }

  public showFormError(message: string = 'Error', body: string = 'FormError', icon: string = 'fa-times', style: MessageStyle = MessageStyle.smallBox, timeout: number = 4000) {
    this.showError(message, body, icon, style, timeout);
  }

  public showSuccess(message: string = 'Operation completed successfully', body: string = '', icon: string = 'fa-check', style: MessageStyle = MessageStyle.smallBox, timeout: number = 4000) {
    this.ShowMessage(message, body, MessageType.Success, style, icon, timeout);
  }

  public showDeleteSuccess(message: string = 'Operation completed successfully', body: string = 'deleteSuccessMessage', icon: string = 'fa-check', style: MessageStyle = MessageStyle.smallBox, timeout: number = 4000) {
    this.ShowMessage(message, body, MessageType.Success, style, icon, timeout);
  }

  public showStepSuccess(message: string = 'Operation completed successfully', body: string = 'MoveToNextStepForm', icon: string = 'fa-check', style: MessageStyle = MessageStyle.smallBox, timeout: number = 4000) {
    this.ShowMessage(message, body, MessageType.Success, style, icon, timeout);
  }

  public showError(message: string = 'Error', body: string = '', icon: string = 'fa-times', style: MessageStyle = MessageStyle.smallBox, timeout: number = 4000) {
    this.ShowMessage(message, body, MessageType.Error, style, icon, timeout);
  }

  public showInfo(message: string, body: string = '', icon: string = 'fa-info-circle', style: MessageStyle = MessageStyle.smallBox, timeout: number = 4000) {
    this.ShowMessage(message, body, MessageType.Information, style, icon, timeout);
  }

  public showWarning(message: string, body: string = '', icon: string = 'fa-exclamation-triangle', style: MessageStyle = MessageStyle.smallBox, timeout: number = 5000) {
    this.ShowMessage(message, body, MessageType.Warning, style, icon, timeout);
  }

  private ShowMessage(message: string, body: string, type: MessageType, style: MessageStyle, icon: string, timeout: number) {
    this.messageTypes[style](message, body, type, icon, timeout);
  }
}
